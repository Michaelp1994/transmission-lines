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
import React from "react";
import { useTranslation } from "react-i18next";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";
import { ConductorLocationTable } from "@/features/conductorLocations";
import { CreateConductorLocationModalProps } from "@/features/conductorLocations/components/CreateConductorLocationModal/CreateConductorLocationModal";

interface TowerGeometryConductorsProps {}

export const TowerGeometryConductors: React.FC<
    TowerGeometryConductorsProps
> = () => {
    const { geometryId } = Route.useParams();
    const { t } = useTranslation("towerGeomeryConductors");
    const createModal = useModal<CreateConductorLocationModalProps>(
        Modals.CreateConductorLocationModal
    );

    const displayCreateModal = () => {
        createModal.open({
            geometryId,
            onClose: createModal.close,
        });
    };
    return (
        <Wrapper>
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
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export const Route = createFileRoute(
    "/tower-geometries/$geometryId/_layout/conductors"
)({
    component: TowerGeometryConductors,
});
