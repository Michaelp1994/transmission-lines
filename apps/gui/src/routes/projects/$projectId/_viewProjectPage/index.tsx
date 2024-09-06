import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
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
                <CardTitle>{t("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <UpdateProjectForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}
