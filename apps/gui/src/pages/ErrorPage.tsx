import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";

import ROUTES from "@/router/routes";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
    const error = useRouteError();
    const { t } = useTranslation("errorPage");
    console.error(error);

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <div>{t("errorPageText")}</div>
                    <Link to={ROUTES.HOME.path}>Go Home</Link>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default ErrorPage;
