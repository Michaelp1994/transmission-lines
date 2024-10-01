import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import HomePageMenu from "~/components/HomePageMenu";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/")({
    component: HomePage,
});

export default function HomePage() {
    return (
        <div className="p-4 max-w-7xl w-full  mx-auto">
            <HomePageMenu />
            <Card>
                <CardHeader>
                    <CardTitle>Home</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        </div>
    );
}
