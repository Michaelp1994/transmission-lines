import { Link } from "react-router-dom";
import { styled } from "@linaria/react";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardHeader,
    CardHeaderText,
    CardTitle,
    CardContent,
} from "@repo/ui";

import { EditConductorTypeForm } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const UpdateConductorType: React.FC<Props> = () => {
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

export default UpdateConductorType;
