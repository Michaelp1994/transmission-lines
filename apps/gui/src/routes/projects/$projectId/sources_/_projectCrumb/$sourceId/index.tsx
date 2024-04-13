import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UpdateSourceForm } from "@/features/sources";
import trpc from "@/utils/trpc";

interface ViewSourcePageProps {}

export const ViewSourcePage: React.FC<ViewSourcePageProps> = () => {
    const { sourceId } = Route.useParams();
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

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/"
)({
    component: ViewSourcePage,
    beforeLoad: () => ({
        text: "View Source",
    }),
});
