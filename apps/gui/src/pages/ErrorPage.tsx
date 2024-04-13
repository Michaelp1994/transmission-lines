import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { Link, useRouteError } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
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
                    <Link to="/">Go Home</Link>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default ErrorPage;
