import type { ConductorTypeID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { DeleteConductorTypeModalProps } from "~/features/conductorTypes/components/DeleteConductorTypeModal/DeleteConductorTypeModal";

export default function useDeleteConductorLocationModal(
    typeId: ConductorTypeID
) {
    const deleteModal = useModal<DeleteConductorTypeModalProps>(
        Modals.DeleteConductorTypeModal
    );

    return () => {
        deleteModal.open({
            typeId,
            onClose: deleteModal.close,
        });
    };
}
