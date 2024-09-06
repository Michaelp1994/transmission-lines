import { Button } from "@repo/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProjectTable } from "~/features/projects";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/projects/")({
    component: AllProjectsPage,
});

export default function AllProjectsPage() {
    const navigate = useNavigate();
    const openProjectMutation = trpc.project.import.useMutation({
        async onSuccess(values) {
            if (!values) {
                // The user closed the open file dialog
                return;
            }
            await navigate({
                to: "/projects/$projectId",
                params: { projectId: values.id },
            });
        },
        onError(error) {
            console.log(error);
            toast.error("There is an error in your file");
        },
    });

    function importProject() {
        openProjectMutation.mutate();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Select a project to begin</CardDescription>

                <Button onClick={importProject}>Import Project</Button>
                <Button asChild>
                    <Link to="/projects/new">New Project</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <ProjectTable />
            </CardContent>
        </Card>
    );
}
