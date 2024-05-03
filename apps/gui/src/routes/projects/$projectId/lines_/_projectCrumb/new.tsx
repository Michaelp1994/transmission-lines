import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
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
                <CardHeaderText>
                    <CardTitle>{t("add.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <CreateTransmissionLineForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}
