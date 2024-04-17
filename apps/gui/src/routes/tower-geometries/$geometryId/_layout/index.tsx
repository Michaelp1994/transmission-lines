import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useTranslation } from "react-i18next";

import { UpdateTowerGeometryForm } from "~/features/towerGeometries";
import trpc from "~/utils/trpc";

interface TowerGeometryGeneralProps {}

export const TowerGeometryGeneral: React.FC<TowerGeometryGeneralProps> = () => {
    const { t } = useTranslation("towerGeometry");
    const { geometryId } = Route.useParams();
    const { data, error, isLoading } = trpc.towerGeometry.getById.useQuery({
        id: geometryId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("edit.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateTowerGeometryForm data={data} />
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute("/tower-geometries/$geometryId/_layout/")({
    component: TowerGeometryGeneral,
    beforeLoad: () => ({
        text: "View Tower Geometry",
    }),
});
