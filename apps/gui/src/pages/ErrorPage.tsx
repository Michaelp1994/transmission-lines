import { styled } from "@linaria/react";
import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";

import ROUTES from "@/router/routes";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
    const error = useRouteError();
    const { t } = useTranslation("errorPage");
    console.error(error);

    return (
        <Wrapper>
            <Link to={ROUTES.HOME.path}>{t("general:goBack")}</Link>

            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <div>{t("errorPageText")}</div>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default ErrorPage;
