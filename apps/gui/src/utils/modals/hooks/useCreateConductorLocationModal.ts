import type { GeometryID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { CreateConductorLocationModalProps } from "~/features/conductorLocations/components/CreateConductorLocationModal/CreateConductorLocationModal";

export default function useCreateConductorLocationModal(
    geometryId: GeometryID
) {
    const createModal = useModal<CreateConductorLocationModalProps>(
        Modals.CreateConductorLocationModal
    );

    return () => {
        createModal.open({
            geometryId,
            onClose: createModal.close,
        });
    };
}
