import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ConductorLocationTable } from "~/features/conductorLocations";
import { useCreateConductorLocationModal } from "~/utils/modals";

export const Route = createFileRoute(
    "/tower-geometries/$geometryId/_layout/conductors"
)({
    component: TowerGeometryConductors,
});

export default function TowerGeometryConductors() {
    const { geometryId } = Route.useParams();
    const { t } = useTranslation("towerGeomeryConductors");
    const displayCreateModal = useCreateConductorLocationModal(geometryId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>{t("description")}</CardDescription>
                <Button onClick={displayCreateModal}>Add</Button>
            </CardHeader>
            <CardContent>
                <ConductorLocationTable geometryId={geometryId} />
            </CardContent>
        </Card>
    );
}
