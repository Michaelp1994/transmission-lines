import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
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
                <CardHeaderText>
                    <CardTitle>All Projects</CardTitle>
                    <CardDescription>Select a project to begin</CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button onClick={importProject}>Import Project</Button>
                    <Button asChild>
                        <Link to="/projects/new">New Project</Link>
                    </Button>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <ProjectTable />
            </CardContent>
        </Card>
    );
}
