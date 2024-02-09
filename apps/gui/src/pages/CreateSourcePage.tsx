import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


import { AddSourceForm } from "@/features/sources";
import ROUTES from "@/router/routes";

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
