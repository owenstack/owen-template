"use client";

import { useToast } from "@/hooks/use-toast";
import { emailOtp, useSession } from "@/lib/auth.client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Submit } from "../submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function VerifyEmail({ code }: { code?: string }) {
  const [otp, setOtp] = useState(code);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useSession();
  if (!auth.data) {
    router.push("/log-in");
    return null;
  }
  if (auth.data.user.emailVerified === true) {
    router.push("/account");
    return null;
  }
  const submit = async (form: FormData) => {
    const otp = form.get("otp") as string;
    const email = form.get("email") as string;
    try {
      await emailOtp.verifyEmail(
        { email, otp },
        {
          onSuccess: () => router.push("/account"),
          onError: (ctx) => {
            toast({
              title: "Error",
              description: ctx.error.message,
              variant: "destructive",
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Internal server error",
        variant: "destructive",
      });
    }
  };
  const sendEmail = async (form: FormData) => {
    try {
      const email = form.get("email") as string;
      await emailOtp.sendVerificationOtp(
        { email, type: "email-verification" },
        {
          onSuccess: () => {
            setOtp("Input one time pin");
          },
          onError: (ctx) => {
            toast({
              title: "Something went wrong",
              description: ctx.error.message,
              variant: "destructive",
            });
          },
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
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Verify your email to access all the features
        </CardDescription>
      </CardHeader>
      <CardContent>
        {otp ? (
          <Form action={submit} className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                autoComplete="email"
                name="email"
                id="email"
                value={auth.data.user.email}
                readOnly
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="otp">Verification code</Label>
              <Input
                name="otp"
                id="otp"
                placeholder={otp}
                min={6}
                max={6}
                required
              />
            </div>
            <Submit>Verify email</Submit>
          </Form>
        ) : (
          <Form action={sendEmail} className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={auth.data.user.email}
                readOnly
                required
              />
            </div>
            <Submit>Send email</Submit>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
