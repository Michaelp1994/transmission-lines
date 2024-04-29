import { LocationID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { DeleteConductorLocationModalProps } from "~/features/conductorLocations/components/DeleteConductorLocationModal/DeleteConductorLocationModal";

export default function useDeleteConductorLocationModal(
    locationId: LocationID
) {
    const deleteModal = useModal<DeleteConductorLocationModalProps>(
        Modals.DeleteConductorLocationModal
    );

    return () => {
        deleteModal.open({
            locationId,
            onClose: deleteModal.close,
        });
    };
}
