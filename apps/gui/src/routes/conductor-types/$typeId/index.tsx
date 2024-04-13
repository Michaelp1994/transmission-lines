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

import UpdateConductorTypeForm from "@/features/conductorTypes/components/UpdateConductorTypeForm";
import trpc from "@/utils/trpc";

interface UpdateConductorTypePageProps {}

export const UpdateConductorTypePage: React.FC<
    UpdateConductorTypePageProps
> = () => {
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
        <Wrapper>
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
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export const Route = createFileRoute("/conductor-types/$typeId/")({
    component: UpdateConductorTypePage,
    beforeLoad: () => ({
        text: "UpdateConductorTypePage",
    }),
});
