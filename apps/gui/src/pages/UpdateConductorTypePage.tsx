import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import UpdateConductorTypeForm from "@/features/conductorTypes/components/UpdateConductorTypeForm";
import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const UpdateConductorTypePage: React.FC<Props> = () => {
    const { conductorTypeId } = useTypedParams(routes.conductorTypes.View);
    const { t } = useTranslation("conductorType");

    const { data, isLoading, error } = trpc.conductorType.getById.useQuery({
        id: conductorTypeId,
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

export default UpdateConductorTypePage;
