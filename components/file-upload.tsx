"use client";

import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { Progress } from "./ui/progress";

interface FileUploadProps {
	className?: string;
	onSuccess?: (url: string) => void;
	onError?: (error: string) => void;
	onProgress?: (progress: number) => void;
	disabled?: boolean;
	accept?: string;
	maxSize?: number; // in bytes
}

export function FileUpload({
	className,
	onSuccess,
	onError,
	onProgress,
	disabled = false,
	accept,
	maxSize,
}: FileUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const validateFile = useCallback(
		(file: File) => {
			if (maxSize && file.size > maxSize) {
				throw new Error(`File size exceeds ${maxSize / 1000000}MB limit`);
			}
			if (accept) {
				const acceptedTypes = accept.split(",").map((type) => type.trim());
				if (
					!acceptedTypes.some((type) => {
						const regex = new RegExp(type.replace("*", ".*"));
						return regex.test(file.type);
					})
				) {
					throw new Error(`File type not accepted. Please upload ${accept}`);
				}
			}
			return true;
		},
		[maxSize, accept],
	);

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			setIsUploading(true);
			setUploadProgress(0);

			// Validate file
			validateFile(file);

			const presignedURL = new URL("/api/presigned", window.location.href);
			presignedURL.searchParams.set("fileName", file.name);
			presignedURL.searchParams.set("contentType", file.type);

			const presignedResponse = await fetch(presignedURL.toString());
			if (!presignedResponse.ok) {
				throw new Error("Failed to get upload URL");
			}

			const { signedUrl } = await presignedResponse.json();

			// Use XMLHttpRequest for upload progress
			await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open("PUT", signedUrl);
				xhr.setRequestHeader("Content-Type", file.type);

				xhr.upload.onprogress = (event) => {
					if (event.lengthComputable) {
						const progress = Math.round((event.loaded / event.total) * 100);
						setUploadProgress(progress);
						onProgress?.(progress);
					}
				};

				xhr.onload = () => {
					if (xhr.status === 200) {
						const fileUrl = signedUrl.split("?")[0];
						onSuccess?.(fileUrl);
						resolve(fileUrl);
					} else {
						reject(new Error(`Upload failed with status ${xhr.status}`));
					}
				};

				xhr.onerror = () => reject(new Error("Upload failed"));
				xhr.onabort = () => reject(new Error("Upload aborted"));

				xhr.send(file);
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Upload failed";
			console.error("Upload error:", error);
			onError?.(errorMessage);
		} finally {
			setIsUploading(false);
			e.target.value = ""; // Reset input
		}
	};

	return (
		<div className="space-y-2">
			<div
				className={cn(
					"flex flex-col items-center justify-center w-full aspect-square",
					className,
				)}
			>
				<label
					htmlFor="dropzone"
					className="flex flex-col items-center justify-center w-full rounded-lg"
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<UploadCloud className="size-8" />
						<p className="text-xs text-muted-foreground">
							<span className="font-semibold">Click to upload</span> or drag and
							drop
						</p>
					</div>
					<input
						onChange={uploadFile}
						disabled={disabled || isUploading}
						accept={accept}
						type="file"
						id="dropzone"
						className="hidden"
					/>
				</label>
			</div>
			{(isUploading || uploadProgress > 0) && (
				<div className="space-y-1">
					<Progress value={uploadProgress} className="h-2 w-full" />
					{uploadProgress > 0 && (
						<p className="text-sm text-gray-500 text-right">
							{uploadProgress}%
						</p>
					)}
				</div>
			)}
		</div>
	);
}
