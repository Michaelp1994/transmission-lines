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
import { toast } from "sonner";

import { ProjectTable } from "~/features/projects";
import trpc from "~/utils/trpc";

interface AllProjectsPageProps {}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = () => {
    const navigate = useNavigate();
    const openProjectMutation = trpc.project.import.useMutation();

    async function importProject() {
        try {
            const data = await openProjectMutation.mutateAsync();
            if (!data) return; // The user closed the open file dialog
            navigate({
                to: "/projects/$projectId",
                params: { projectId: data.id },
            });
        } catch (e) {
            console.log(e);
            toast.error("There is an error in your file");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>All Projects</CardTitle>
                    <CardDescription>Select a project to begin</CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button onClick={() => importProject()}>
                        Import Project
                    </Button>
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
};

export const Route = createFileRoute("/projects/")({
    component: AllProjectsPage,
});
