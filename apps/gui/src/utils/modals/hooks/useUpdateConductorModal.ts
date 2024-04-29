import { ConductorID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { UpdateConductorModalProps } from "~/features/conductors/components/UpdateConductorModal/UpdateConductorModal";

export default function useUpdateConductorModal(conductorId: ConductorID) {
    const modal = useModal<UpdateConductorModalProps>(
        Modals.UpdateConductorModal
    );

    return () => {
        modal.open({
            conductorId,
            onClose: modal.close,
        });
    };
}
