import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { CreateProjectForm } from "~/features/projects";

export const Route = createFileRoute("/projects/new")({
    component: CreateProjectPage,
    beforeLoad: () => {
        return {
            text: "New Project",
        };
    },
});

export default function CreateProjectPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription>Create a new project</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateProjectForm />
            </CardContent>
        </Card>
    );
}
