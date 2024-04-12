import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import UpdateSourceForm from "@/features/sources/components/UpdateSourceForm";
import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ViewSourcePage: React.FC<Props> = () => {
    const { sourceId } = useTypedParams(routes.projects.View.Sources.View);
    const { t } = useTranslation("source");
    const { data, isLoading, error } = trpc.source.getById.useQuery({
        id: sourceId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <PageWrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <UpdateSourceForm data={data} />
                </CardContent>
            </Card>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default ViewSourcePage;
