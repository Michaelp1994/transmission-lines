import NiceModal from "@ebay/nice-modal-react";

import SettingsModal from "~/components/NavBar/SettingsModal";
import {
    CreateConductorLocationModal,
    DeleteConductorLocationModal,
    UpdateConductorLocationModal,
} from "~/features/conductorLocations";
import {
    CreateConductorModal,
    DeleteConductorModal,
    GenerateConductorsModal,
    UpdateConductorModal,
} from "~/features/conductors";
import { DeleteSourceModal } from "~/features/sources";
import { DeleteTowerGeometryModal } from "~/features/towerGeometries";
import {
    CreateTowerModal,
    DeleteTowerModal,
    GenerateTowersModal,
    UpdateTowerModal,
} from "~/features/towers";
import DeleteTransmissionLineModal from "~/features/transmissionLines/components/DeleteTransmissionLineModal";

NiceModal.register("create-conductor-location", CreateConductorLocationModal);
NiceModal.register("update-conductor-location", UpdateConductorLocationModal);
NiceModal.register("delete-conductor-location", DeleteConductorLocationModal);

NiceModal.register("create-conductor", CreateConductorModal);
NiceModal.register("update-conductor", UpdateConductorModal);
NiceModal.register("delete-conductor", DeleteConductorModal);

NiceModal.register("delete-source", DeleteSourceModal);

NiceModal.register("delete-transmission-line", DeleteTransmissionLineModal);

NiceModal.register("delete-tower-geometry", DeleteTowerGeometryModal);

NiceModal.register("update-tower", UpdateTowerModal);
NiceModal.register("delete-tower", DeleteTowerModal);

NiceModal.register("create-conductor", CreateConductorModal);
NiceModal.register("generate-conductors", GenerateConductorsModal);

NiceModal.register("create-tower", CreateTowerModal);
NiceModal.register("generate-towers", GenerateTowersModal);
NiceModal.register("settings", SettingsModal);
