import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";

import ROUTES from "@/router/routes";
import { AddSourceForm } from "@/features/sources";

interface Props {}

const CreateSource: React.FC<Props> = () => {
    const { t } = useTranslation("source");

    return (
        <PageWrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                        <CardDescription>
                            {t("add.description")}
                        </CardDescription>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <AddSourceForm />
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

export default CreateSource;
