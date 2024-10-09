import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateProjectForm from "./-components/CreateProjectForm";

export const Route = createFileRoute("/project/new")({
    component: CreateProjectPage,
});

export default function CreateProjectPage() {
    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>Create a new project</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateProjectForm />
                </CardContent>
            </Card>
        </div>
    );
}
