import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderOpen, PlusCircle, Save, SaveAll } from "lucide-react";
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
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                <Button
                    variant="outline"
                    className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                    asChild
                >
                    <Link to="/projects/new">
                        <PlusCircle className="h-8 w-8 mb-2" />
                        <span className="text-xs">New</span>
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                >
                    <FolderOpen className="h-8 w-8 mb-2" />
                    <span className="text-xs">Open</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                >
                    <Save className="h-8 w-8 mb-2" />
                    <span className="text-xs">Save</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                >
                    <SaveAll className="h-8 w-8 mb-2" />
                    <span className="text-xs">Save As...</span>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Home</CardTitle>
                </CardHeader>
                <CardContent>{data}</CardContent>
            </Card>
        </>
    );
}
