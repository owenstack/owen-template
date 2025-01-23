import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from "@react-email/components";

export interface InviteUser {
  invitedEmail: string;
  inviterName: string;
  inviterEmail: string;
  orgName: string;
  inviteLink: string;
}

export const InviteUserEmail = ({
  invitedEmail,
  inviterName,
  inviterEmail,
  orgName,
  inviteLink,
}: InviteUser) => {
  const previewText = `Join ${inviterName} on ${orgName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Join <strong>{inviterName}</strong> on <strong>{orgName}</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {invitedEmail},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{inviterName}</strong> (
              <Link
                href={`mailto:${inviterEmail}`}
                className="text-blue-600 no-underline"
              >
                {inviterEmail}
              </Link>
              ) has invited you to <strong>{orgName}</strong>
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{invitedEmail}</span>. If you were
              not expecting this invitation, you can ignore this email. If you
              are concerned about your account's safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const inviteUserString = async ({
  invitedEmail,
  inviterName,
  inviteLink,
  inviterEmail,
  orgName,
}: InviteUser) => {
  const html = await render(
    <InviteUserEmail
      invitedEmail={invitedEmail}
      inviterName={inviterName}
      inviterEmail={inviterEmail}
      orgName={orgName}
      inviteLink={inviteLink}
    />
  );
  return html;
};
