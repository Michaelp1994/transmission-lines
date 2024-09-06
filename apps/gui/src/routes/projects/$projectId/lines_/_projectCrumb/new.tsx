import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CreateTransmissionLineForm } from "~/features/transmissionLines";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/new"
)({
    component: CreateTransmissionLinePage,
    beforeLoad: () => {
        return {
            text: "New Transmission Lines",
        };
    },
});

export default function CreateTransmissionLinePage() {
    const { t } = useTranslation("transmissionLine");
    const { projectId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateTransmissionLineForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}
