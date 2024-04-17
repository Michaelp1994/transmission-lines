import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { CreateSourceForm } from "~/features/sources";

interface CreateSourcePageProps {}

export const CreateSourcePage: React.FC<CreateSourcePageProps> = () => {
    const { t } = useTranslation("source");
    const { projectId } = Route.useParams();

    return (
        <PageWrapper>
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
                    <CreateSourceForm projectId={projectId} />
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
    "/projects/$projectId/sources/_projectCrumb/new"
)({
    component: CreateSourcePage,
    beforeLoad: () => ({
        text: "New Source",
    }),
});
