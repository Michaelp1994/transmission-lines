import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateProjectForm } from "~/features/projects";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/projects/$projectId/_viewProjectPage/")({
    component: ProjectGeneral,
});

export default function ProjectGeneral() {
    const { t } = useTranslation("projects");
    const { projectId } = Route.useParams();
    const { data, error, isLoading } = trpc.project.getById.useQuery({
        id: projectId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>General Info</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateProjectForm data={data} />
            </CardContent>
        </Card>
    );
}
