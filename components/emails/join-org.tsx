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
import * as React from "react";

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
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Join <strong>{inviterName}</strong> on <strong>{orgName}</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hello {invitedEmail},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							<strong>{inviterName}</strong> (
							<Link
								href={`mailto:${inviterEmail}`}
								className="text-blue-600 no-underline"
							>
								{inviterEmail}
							</Link>
							) has invited you to <strong>{orgName}</strong>
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={inviteLink}
							>
								Join the team
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							or copy and paste this URL into your browser:{" "}
							<Link href={inviteLink} className="text-blue-600 no-underline">
								{inviteLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
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
		/>,
	);
	return html;
};
