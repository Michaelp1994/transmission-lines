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

export const Route = createFileRoute("/projects/$projectId/_viewProjectPage/")({
    component: ProjectGeneral,
});

export default function ProjectGeneral() {
    const { t } = useTranslation("viewProjectPage");
    const { projectId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateProjectForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}
