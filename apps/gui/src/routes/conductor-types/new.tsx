import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CreateConductorTypeForm } from "~/features/conductorTypes";

export const Route = createFileRoute("/conductor-types/new")({
    component: CreateConductorTypePage,
    beforeLoad: () => {
        return {
            text: "New Conductor Type",
        };
    },
});

export default function CreateConductorTypePage() {
    const { t } = useTranslation("conductorType");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateConductorTypeForm />
            </CardContent>
        </Card>
    );
}
