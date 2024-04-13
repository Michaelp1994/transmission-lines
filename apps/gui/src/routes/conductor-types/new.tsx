import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { CreateConductorTypeForm } from "@/features/conductorTypes";

interface CreateConductorTypePageProps {}

export const CreateConductorTypePage: React.FC<
    CreateConductorTypePageProps
> = () => {
    const { t } = useTranslation("conductorType");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("add.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <CreateConductorTypeForm />
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute("/conductor-types/new")({
    component: CreateConductorTypePage,
    beforeLoad: () => ({
        text: "CreateConductorTypePage",
    }),
});
