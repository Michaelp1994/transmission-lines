import { Link } from "react-router-dom";
import { styled } from "@linaria/react";
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

const PageNotFound: React.FC<Props> = () => {
    const { t } = useTranslation("pageNotFound");

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
                    <div>{t("text")}</div>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default PageNotFound;
