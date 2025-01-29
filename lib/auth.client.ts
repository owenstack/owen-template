import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  plugins: [adminClient(), emailOTPClient()],
});

export const {
  useSession,
  deleteUser,
  updateUser,
  signIn,
  signOut,
  signUp,
  sendVerificationEmail,
  getSession,
  linkSocial,
  listSessions,
  revokeSession,
  revokeSessions,
  revokeOtherSessions,
  admin,
  listAccounts,
  changeEmail,
  changePassword,
  emailOtp,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = authClient;
