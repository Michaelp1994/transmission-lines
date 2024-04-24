import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateSourceElectricalForm } from "~/features/sources";
import trpc from "~/utils/trpc";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/electrical"
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
                    <CardTitle>Electrical Properties</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateSourceElectricalForm sourceId={sourceId} />
            </CardContent>
        </Card>
    );
}
