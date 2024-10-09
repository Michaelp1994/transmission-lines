import { Button } from "@repo/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import toast from "@repo/ui/toast";
import { createFileRoute } from "@tanstack/react-router";

import trpc from "~/utils/trpc";

export const Route = createFileRoute("/project/_layout/results")({
    component: ResultsPage,
});

export default function ResultsPage() {
    const solveMutation = trpc.solution.solve.useMutation({
        onSuccess: () => {
            toast.success("Solved");
        },
        onError: () => {
            toast.error("Can't solve");
        },
    });

    return (
        <CardWrapper>
            <CardToolbar>
                <Button onClick={() => solveMutation.mutate()}>Solve</Button>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                    <CardDescription>View results</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>TODO</p>
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
