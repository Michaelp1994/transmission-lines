import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { EditConductorTypeForm } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const UpdateConductorTypePage: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.UPDATE_CONDUCTOR_TYPE);
    const { t } = useTranslation("conductorType");

    return (
        <Wrapper>
            <Link to={ROUTES.ALL_CONDUCTOR_TYPES.path}>
                {t("general:goBack")}
            </Link>

            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <EditConductorTypeForm id={id} />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default UpdateConductorTypePage;
