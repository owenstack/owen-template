import { emailOtpString } from "@/components/emails/email-otp";
import { inviteUserString } from "@/components/emails/join-org";
import { resetPasswordString } from "@/components/emails/password-reset";
import { env } from "@/lib/env";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: env.SMTP_SERVER_HOST,
  port: 587,
  auth: {
    user: env.SMTP_SERVER_USER,
    pass: env.SMTP_KEY,
  },
});

export async function sendVerificationOTP(otp: string, email: string) {
  try {
    const body = await emailOtpString(otp);
    const mail = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Your log in code for Acme Inc",
      html: body,
    });
    if (!mail) return { error: "Failed to send mail" };
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

export async function sendResetPassword(
  userName: string,
  inviteLink: string,
  email: string
) {
  try {
    const body = await resetPasswordString({ userName, inviteLink });
    const mail = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Reset Your Acme Inc Account Password",
      html: body,
    });
    if (!mail) return { error: "Failed to send mail" };
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

export async function sendInviteEmail(
  inviterName: string,
  inviteLink: string,
  inviterEmail: string,
  orgName: string,
  invitedEmail: string
) {
  try {
    const body = await inviteUserString({
      invitedEmail,
      inviterName,
      inviteLink,
      inviterEmail,
      orgName,
    });
    const mail = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: invitedEmail,
      subject: `Join ${inviterName} on ${orgName}`,
      html: body,
    });
    if (!mail) return { error: "Failed to send mail" };
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}
