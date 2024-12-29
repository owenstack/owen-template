import { VerifyEmail } from "@/components/auth/verify";
import { ErrorCard } from "@/components/error-card";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ error?: string; code?: string }> }) {
	const error = (await searchParams)?.error;
	if (error) {
		return <ErrorCard error={error} />;
	}
	const code = (await searchParams)?.code;
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
			<VerifyEmail code={code} />
		</main>
	);
}
