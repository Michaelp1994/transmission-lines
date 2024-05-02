import type { GeometryID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { DeleteTowerGeometryModalProps } from "~/features/towerGeometries/components/DeleteTowerGeometryModal/DeleteTowerGeometryModal";

export default function useDeleteTowerGeometryModal(geometryId: GeometryID) {
    const deleteModal = useModal<DeleteTowerGeometryModalProps>(
        Modals.DeleteTowerGeometryModal
    );

    return () => {
        deleteModal.open({
            geometryId,
            onClose: deleteModal.close,
        });
    };
}
