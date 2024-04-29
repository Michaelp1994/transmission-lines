import { ConductorID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { DeleteConductorModalProps } from "~/features/conductors/components/DeleteConductorModal/DeleteConductorModal";

export default function useDeleteConductorModal(conductorId: ConductorID) {
    const deleteModal = useModal<DeleteConductorModalProps>(
        Modals.DeleteConductorModal
    );

    return () => {
        deleteModal.open({
            conductorId,
            onClose: deleteModal.close,
        });
    };
}
