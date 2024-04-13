import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import UpdateProjectForm from "@/features/projects/components/UpdateProjectForm";
import trpc from "@/utils/trpc";

interface ProjectGeneralProps {}

export const ProjectGeneral: React.FC<ProjectGeneralProps> = () => {
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
};

export const Route = createFileRoute("/projects/$projectId/_viewProjectPage/")({
    component: ProjectGeneral,
});
