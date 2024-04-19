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
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/conductor-types/$typeId/_layout/")({
    component: UpdateConductorTypePage,
    beforeLoad: () => ({
        text: "UpdateConductorTypePage",
    }),
});

export default function UpdateConductorTypePage() {
    const { typeId } = Route.useParams();
    const { t } = useTranslation("conductorType");

    const { data, isLoading, error } = trpc.conductorType.getById.useQuery({
        id: typeId,
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
                <UpdateConductorTypeForm data={data} />
            </CardContent>
        </Card>
    );
}
