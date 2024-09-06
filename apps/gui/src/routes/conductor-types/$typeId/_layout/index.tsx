import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { UpdateConductorTypeForm } from "~/features/conductorTypes";

export const Route = createFileRoute("/conductor-types/$typeId/_layout/")({
    component: UpdateConductorTypePage,
    beforeLoad: () => {
        return {
            text: "UpdateConductorTypePage",
        };
    },
});

export default function UpdateConductorTypePage() {
    const { typeId } = Route.useParams();
    const { t } = useTranslation("conductorType");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("edit.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <UpdateConductorTypeForm conductorTypeId={typeId} />
            </CardContent>
        </Card>
    );
}
