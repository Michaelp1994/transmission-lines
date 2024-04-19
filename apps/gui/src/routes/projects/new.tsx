import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";

import { CreateProjectForm } from "~/features/projects";

export const Route = createFileRoute("/projects/new")({
    component: CreateProjectPage,
    beforeLoad: () => ({
        text: "New Project",
    }),
});

export default function CreateProjectPage() {
    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>Create a new project</CardDescription>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <CreateProjectForm />
            </CardContent>
        </Card>
    );
}
