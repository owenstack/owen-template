import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function ErrorCard({ error }: { error: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
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
