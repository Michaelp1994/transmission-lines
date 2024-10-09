import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";

import { CreateTransmissionLineForm } from "~/features/transmissionLines";

export const Route = createFileRoute("/project/_layout/lines/new")({
    component: NewProjectTransmissionLinePage,
});

export default function NewProjectTransmissionLinePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateTransmissionLineForm />
            </CardContent>
        </Card>
    );
}
