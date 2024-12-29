import { env } from "@/lib/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
	try {
		const searchParams = req.nextUrl.searchParams;
		const fileName = searchParams.get("fileName");
		const contentType = searchParams.get("contentType");
		if (!fileName || !contentType) {
			return new Response("File not found", { status: 500 });
		}
		const client = new S3Client({
			region: env.AWS_REGION,
			credentials: {
				accessKeyId: env.AWS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			},
		});

		const command = new PutObjectCommand({
			Bucket: env.AWS_S3_BUCKET_NAME,
			Key: fileName,
			ContentType: contentType,
		});

		const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
		if (!signedUrl) {
			console.error("Failed to generate signed URL");
			return new Response("Failed to generate signed URL", { status: 500 });
		}
		return new Response(JSON.stringify({ signedUrl }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Internal server error", { status: 500 });
	}
}
