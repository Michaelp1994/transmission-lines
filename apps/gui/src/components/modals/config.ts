import React, { LazyExoticComponent } from "react";

export enum Modals {
    CreateTowerModal,
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
}

export const modalsConfig: Record<Modals, LazyExoticComponent<any>> = {
    [Modals.CreateConductorLocationModal]: React.lazy(
        () =>
            import(
                "../../features/conductorLocations/components/CreateConductorLocationModal"
            )
    ),
    [Modals.UpdateConductorLocationModal]: React.lazy(
        () =>
            import(
                "../../features/conductorLocations/components/UpdateConductorLocationModal"
            )
    ),
    [Modals.DeleteConductorLocationModal]: React.lazy(
        () =>
            import(
                "../../features/conductorLocations/components/DeleteConductorLocationModal"
            )
    ),
    [Modals.CreateTowerModal]: React.lazy(
        () => import("../../features/towers/components/CreateTowerModal")
    ),
    [Modals.DeleteTowerModal]: React.lazy(
        () => import("../../features/towers/components/DeleteTowerModal")
    ),
    [Modals.GenerateTowersModal]: React.lazy(
        () => import("../../features/towers/components/GenerateTowersModal")
    ),
    [Modals.TowerParametersModal]: React.lazy(
        () => import("../../features/towers/components/TowerParametersModal")
    ),
    [Modals.UpdateTowerModal]: React.lazy(
        () => import("../../features/towers/components/UpdateTowerModal")
    ),
    [Modals.UpdateConductorModal]: React.lazy(
        () =>
            import("../../features/conductors/components/UpdateConductorModal")
    ),
    [Modals.CreateConductorModal]: React.lazy(
        () =>
            import("../../features/conductors/components/CreateConductorModal")
    ),
    [Modals.DeleteConductorModal]: React.lazy(
        () =>
            import("../../features/conductors/components/DeleteConductorModal")
    ),
    [Modals.GenerateConductorsModal]: React.lazy(
        () =>
            import(
                "../../features/conductors/components/GenerateConductorsModal"
            )
    ),
};
