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

import { CreateTransmissionLineForm } from "~/features/transmissionLines";

interface CreateTransmissionLinePageProps {}

export const CreateTransmissionLinePage: React.FC<
    CreateTransmissionLinePageProps
> = () => {
    const { t } = useTranslation("transmissionLine");
    const { projectId } = Route.useParams();

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <CreateTransmissionLineForm projectId={projectId} />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/new"
)({
    component: CreateTransmissionLinePage,
    beforeLoad: () => ({
        text: "New Transmission Lines",
    }),
});
