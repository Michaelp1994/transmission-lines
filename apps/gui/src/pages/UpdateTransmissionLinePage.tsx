import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
    Separator,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { EditTransmissionLineForm } from "@/features/transmissionLines";
import ROUTES from "@/router/routes";

interface Props {}

const UpdateTransmissionLine: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");
    const { id } = useTypedParams(ROUTES.UPDATE_TRANSMISSION_LINE);

    return (
        <Wrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("update.title")}</CardTitle>
                        <CardDescription>
                            {t("update.description")}
                        </CardDescription>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <EditTransmissionLineForm id={id} />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default UpdateTransmissionLine;
