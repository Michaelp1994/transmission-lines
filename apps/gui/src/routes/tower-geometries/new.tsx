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

import { CreateTowerGeometryForm } from "~/features/towerGeometries";

interface CreateTowerGeometryPageProps {}

export const CreateTowerGeometryPage: React.FC<
    CreateTowerGeometryPageProps
> = () => {
    const { t } = useTranslation("towerGeometry");

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <CreateTowerGeometryForm />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export const Route = createFileRoute("/tower-geometries/new")({
    component: CreateTowerGeometryPage,
    beforeLoad: () => ({
        text: "New Tower Geometry",
    }),
});
