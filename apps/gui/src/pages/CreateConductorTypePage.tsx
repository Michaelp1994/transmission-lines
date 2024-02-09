import { Link } from "react-router-dom";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";

import { AddConductorTypeForm } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";

interface Props {}

const CreateConductorType: React.FC<Props> = () => {
    const { t } = useTranslation("conductorType");

    return (
        <Wrapper>
            <Link to={ROUTES.ALL_CONDUCTOR_TYPES.path}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <AddConductorTypeForm />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default CreateConductorType;
