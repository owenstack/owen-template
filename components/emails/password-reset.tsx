import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";

export interface ResetPassword {
  userName: string;
  inviteLink: string;
}

export const ResetPasswordEmail = ({ userName, inviteLink }: ResetPassword) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Your Acme Inc Account Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {userName},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Acme Inc
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={inviteLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const resetPasswordString = async ({
  userName,
  inviteLink,
}: ResetPassword) => {
  const html = await render(
    <ResetPasswordEmail userName={userName} inviteLink={inviteLink} />
  );
  return html;
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
