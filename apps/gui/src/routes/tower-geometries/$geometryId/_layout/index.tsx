import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { UpdateTowerGeometryForm } from "~/features/towerGeometries";

export const Route = createFileRoute("/tower-geometries/$geometryId/_layout/")({
    component: TowerGeometryGeneral,
    beforeLoad: () => {
        return {
            text: "View Tower Geometry",
        };
    },
});

export default function TowerGeometryGeneral() {
    const { t } = useTranslation("towerGeometry");
    const { geometryId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("edit.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <UpdateTowerGeometryForm geometryId={geometryId} />
            </CardContent>
        </Card>
    );
}
