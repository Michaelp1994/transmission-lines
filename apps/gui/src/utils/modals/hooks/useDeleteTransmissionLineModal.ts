import type { LineID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { DeleteTransmissionLineModalProps } from "~/features/transmissionLines/components/DeleteTransmissionLineModal/DeleteTransmissionLineModal";

export default function useDeleteTransmissionLineModal(lineId: LineID) {
    const deleteModal = useModal<DeleteTransmissionLineModalProps>(
        Modals.DeleteTransmissionLineModal
    );

    return () => {
        deleteModal.open({
            lineId,
            onClose: deleteModal.close,
        });
    };
}
