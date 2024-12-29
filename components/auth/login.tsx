"use client";

import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Form from "next/form";
import { Submit } from "../submit";
import { GoogleButton } from "./google";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

export function LoginForm({ className }: { className?: string }) {
	const { toast } = useToast();
	const router = useRouter();
	const submit = async (form: FormData) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		try {
			await signIn.email(
				{
					email,
					password,
				},
				{
					onError: (ctx) => {
						toast({
							title: "Something went wrong",
							description: ctx.error.message,
							variant: "destructive",
						});
					},
					onSuccess: () => router.push("/account"),
				},
			);
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your Google account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form action={submit}>
						<div className="grid gap-6">
							<GoogleButton />
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											href="/forgot-password"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input
										id="password"
										type="password"
										name="password"
										required
									/>
								</div>
								<Submit className="w-full">Login</Submit>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/sign-up" className="underline underline-offset-4">
									Sign up
								</Link>
							</div>
						</div>
					</Form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our{" "}
				<Link href="/tos">Terms of Service</Link> and{" "}
				<Link href="/tos">Privacy Policy</Link>.
			</div>
		</div>
	);
}
