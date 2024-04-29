import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
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
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button onClick={displayCreateModal}>Add</Button>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <ConductorLocationTable geometryId={geometryId} />
            </CardContent>
        </Card>
    );
}
