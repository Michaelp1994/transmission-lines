import type { LocationID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { UpdateConductorLocationModalProps } from "~/features/conductorLocations/components/UpdateConductorLocationModal/UpdateConductorLocationModal";

export default function useUpdateConductorLocationModal(
    conductorLocationId: LocationID
) {
    const modal = useModal<UpdateConductorLocationModalProps>(
        Modals.UpdateConductorLocationModal
    );

    return () => {
        modal.open({
            conductorLocationId,
            onClose: modal.close,
        });
    };
}
