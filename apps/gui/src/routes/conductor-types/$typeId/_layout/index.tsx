import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateConductorTypeForm } from "~/features/conductorTypes";

export const Route = createFileRoute("/conductor-types/$typeId/_layout/")({
    component: UpdateConductorTypePage,
    beforeLoad: () => ({
        text: "UpdateConductorTypePage",
    }),
});

export default function UpdateConductorTypePage() {
    const { typeId } = Route.useParams();
    const { t } = useTranslation("conductorType");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("edit.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateConductorTypeForm conductorTypeId="typeId" />
            </CardContent>
        </Card>
    );
}
