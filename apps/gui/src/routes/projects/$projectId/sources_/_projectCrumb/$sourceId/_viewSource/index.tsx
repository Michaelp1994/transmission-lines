import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateSourceForm } from "~/features/sources";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/"
)({
    component: ViewSourcePage,
    beforeLoad: () => ({
        text: "View Source",
    }),
});

export default function ViewSourcePage() {
    const { sourceId } = Route.useParams();
    const { t } = useTranslation("source");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("edit.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateSourceForm sourceId={sourceId} />
            </CardContent>
        </Card>
    );
}
