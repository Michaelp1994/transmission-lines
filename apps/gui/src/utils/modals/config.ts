import { type LazyExoticComponent, lazy } from "react";

export enum Modals {
    CreateTowerModal,
    DeleteConductorTypeModal,
    DeleteTowerModal,
    GenerateTowersModal,
    TowerParametersModal,
    UpdateTowerModal,
    UpdateConductorModal,
    CreateConductorModal,
    DeleteConductorModal,
    GenerateConductorsModal,
    CreateConductorLocationModal,
    UpdateConductorLocationModal,
    DeleteConductorLocationModal,
    DeleteProjectModal,
    DeleteTowerGeometryModal,
    DeleteSourceModal,
    DeleteTransmissionLineModal,
}

export const modalsConfig: Record<Modals, LazyExoticComponent<any>> = {
    [Modals.DeleteConductorTypeModal]: lazy(() => {
        return import(
            "~/features/conductorTypes/components/DeleteConductorTypeModal"
        );
    }),
    [Modals.DeleteTransmissionLineModal]: lazy(() => {
        return import(
            "~/features/transmissionLines/components/DeleteTransmissionLineModal"
        );
    }),
    [Modals.DeleteSourceModal]: lazy(
        () => import("~/features/sources/components/DeleteSourceModal")
    ),
    [Modals.DeleteTowerGeometryModal]: lazy(() => {
        return import(
            "~/features/towerGeometries/components/DeleteTowerGeometryModal"
        );
    }),
    [Modals.CreateConductorLocationModal]: lazy(() => {
        return import(
            "~/features/conductorLocations/components/CreateConductorLocationModal"
        );
    }),
    [Modals.UpdateConductorLocationModal]: lazy(() => {
        return import(
            "~/features/conductorLocations/components/UpdateConductorLocationModal"
        );
    }),
    [Modals.DeleteConductorLocationModal]: lazy(() => {
        return import(
            "~/features/conductorLocations/components/DeleteConductorLocationModal"
        );
    }),
    [Modals.DeleteProjectModal]: lazy(
        () => import("~/features/projects/components/DeleteProjectModal")
    ),
    [Modals.CreateTowerModal]: lazy(
        () => import("~/features/towers/components/CreateTowerModal")
    ),
    [Modals.DeleteTowerModal]: lazy(
        () => import("~/features/towers/components/DeleteTowerModal")
    ),
    [Modals.GenerateTowersModal]: lazy(
        () => import("~/features/towers/components/GenerateTowersModal")
    ),
    [Modals.TowerParametersModal]: lazy(
        () => import("~/features/towers/components/TowerParametersModal")
    ),
    [Modals.UpdateTowerModal]: lazy(
        () => import("~/features/towers/components/UpdateTowerModal")
    ),
    [Modals.UpdateConductorModal]: lazy(
        () => import("~/features/conductors/components/UpdateConductorModal")
    ),
    [Modals.CreateConductorModal]: lazy(
        () => import("~/features/conductors/components/CreateConductorModal")
    ),
    [Modals.DeleteConductorModal]: lazy(
        () => import("~/features/conductors/components/DeleteConductorModal")
    ),
    [Modals.GenerateConductorsModal]: lazy(
        () => import("~/features/conductors/components/GenerateConductorsModal")
    ),
};
