import { ForgotPassword } from "@/components/auth/reset";
import { ErrorCard } from "@/components/error-card";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ error?: string }> }) {
	const error = (await searchParams)?.error;
	if (error) {
		return <ErrorCard error={error} />;
	}
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<ForgotPassword />
		</div>
	);
}
