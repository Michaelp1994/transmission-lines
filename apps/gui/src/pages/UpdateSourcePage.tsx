import { styled } from "@linaria/react";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";

import ROUTES from "@/router/routes";
import { EditSourceForm } from "@/features/sources";

interface Props {}

const UpdateSource: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.UPDATE_SOURCE);
    const { t } = useTranslation("source");

    return (
        <PageWrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <EditSourceForm id={id} />
                </CardContent>
            </Card>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export default UpdateSource;
