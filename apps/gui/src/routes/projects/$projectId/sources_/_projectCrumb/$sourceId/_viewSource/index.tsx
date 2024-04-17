import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateSourceForm } from "@/features/sources";
import trpc from "@/utils/trpc";

interface ViewSourcePageProps {}

export const ViewSourcePage: React.FC<ViewSourcePageProps> = () => {
    const { sourceId } = Route.useParams();
    const { t } = useTranslation("source");
    const { data, isLoading, error } = trpc.source.getById.useQuery({
        id: sourceId,
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
                    <CardTitle>{t("edit.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateSourceForm data={data} />
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/"
)({
    component: ViewSourcePage,
    beforeLoad: () => ({
        text: "View Source",
    }),
});
