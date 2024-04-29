import { SourceID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { DeleteSourceModalProps } from "~/features/sources/components/DeleteSourceModal/DeleteSourceModal";

export default function useDeleteSourceModal(sourceId: SourceID) {
    const deleteModal = useModal<DeleteSourceModalProps>(
        Modals.DeleteSourceModal
    );

    return () => {
        deleteModal.open({
            sourceId,
            onClose: deleteModal.close,
        });
    };
}
