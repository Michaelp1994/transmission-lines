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

interface CreateProjectPageProps {}

export const CreateProjectPage: React.FC<CreateProjectPageProps> = () => (
    <PageWrapper>
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
    </PageWrapper>
);

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Route = createFileRoute("/projects/new")({
    component: CreateProjectPage,
    beforeLoad: () => ({
        text: "New Project",
    }),
});
