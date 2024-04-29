import { TowerID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { DeleteTowerModalProps } from "~/features/towers/components/DeleteTowerModal/DeleteTowerModal";

export default function useDeleteTowerModal(towerId: TowerID) {
    const deleteModal = useModal<DeleteTowerModalProps>(
        Modals.DeleteTowerModal
    );

    return () => {
        deleteModal.open({
            towerId,
            onClose: deleteModal.close,
        });
    };
}
