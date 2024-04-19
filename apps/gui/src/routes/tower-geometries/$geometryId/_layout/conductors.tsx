import { styled } from "@linaria/react";
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

import { Modals } from "~/components/modals/config";
import useModal from "~/components/modals/use-modal";
import { ConductorLocationTable } from "~/features/conductorLocations";
import { CreateConductorLocationModalProps } from "~/features/conductorLocations/components/CreateConductorLocationModal/CreateConductorLocationModal";

export const Route = createFileRoute(
    "/tower-geometries/$geometryId/_layout/conductors"
)({
    component: TowerGeometryConductors,
});

export default function TowerGeometryConductors() {
    const { geometryId } = Route.useParams();
    const { t } = useTranslation("towerGeomeryConductors");
    const createModal = useModal<CreateConductorLocationModalProps>(
        Modals.CreateConductorLocationModal
    );

    function displayCreateModal() {
        createModal.open({
            geometryId,
            onClose: createModal.close,
        });
    }
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
