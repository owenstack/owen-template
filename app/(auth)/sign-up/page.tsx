import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup";
import Background from "@/assets/images/background-image.webp";
import Image from "next/image";
import { ErrorCard } from "@/components/error-card";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ error?: string }> }) {
	const error = (await searchParams)?.error;
	if (error) {
		return <ErrorCard error={error} />;
	}
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Acme Inc.
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignupForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src={Background.src}
					loading="lazy"
					blurDataURL={Background.blurDataURL}
					alt="placeholder"
					fill
					sizes="100vw"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
