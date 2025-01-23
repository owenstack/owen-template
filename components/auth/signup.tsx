"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/auth.client";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Submit } from "../submit";
import { GoogleButton } from "./google";

export function SignupForm({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const validatePassword = (pass: string, confirm: string) => {
    if (pass.length < 8) {
      return false;
    }
    if (pass !== confirm) {
      return false;
    }
    return true;
  };

  const submit = async (form: FormData) => {
    const firstName = form.get("first_name") as string;
    const surName = form.get("last_name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirm_password") as string;
    if (!validatePassword(password, confirmPassword)) {
      toast({
        title: "Invalid body",
        description: "Passwords don't match or are too short",
        variant: "destructive",
      });
      return;
    }
    try {
      await signUp.email(
        {
          email,
          password,
          name: `${firstName} ${surName}`,
        },
        {
          onError: (ctx) => {
            toast({
              title: "Something went wrong",
              description: ctx.error.message,
              variant: "destructive",
            });
          },
          onSuccess: () => router.push("/verify-email"),
        }
      );
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Internal server error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Enter your information to create an account
        </p>
      </div>
      <Form action={submit} className="grid gap-6">
        <div className="flex items-center gap-2">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        <Submit className="w-full">Sign Up</Submit>
      </Form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <GoogleButton />
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/log-in" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </div>
  );
}
