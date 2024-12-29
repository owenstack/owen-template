import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
	children,
}: { children: React.ReactNode }) {
	const authz = await auth.api.getSession({ headers: await headers() });
	if (!authz?.user) {
		redirect("/log-in");
	}
	if (!authz?.user.emailVerified) {
		redirect("/verify-email");
	}
	return <>{children}</>;
}
