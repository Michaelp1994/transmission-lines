import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/")({
    component: HomePage,
});

export default function HomePage() {
    const { data, error, isLoading, isError } = trpc.meta.version.useQuery();

    if (isLoading) {
        return "is Loading...";
    }
    if (isError) {
        console.log(error);
        return "Is Error!";
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Home</CardTitle>
            </CardHeader>
            <CardContent>{data}</CardContent>
        </Card>
    );
}
