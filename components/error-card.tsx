import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";

export function ErrorCard({ error }: { error: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 h-screen">
			<Card>
				<CardHeader className="text-destructive">
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>Error: {error}</CardDescription>
				</CardHeader>
				<CardContent className="text-destructive-foreground">
					Please reload and try again.
				</CardContent>
			</Card>
		</div>
	);
}
