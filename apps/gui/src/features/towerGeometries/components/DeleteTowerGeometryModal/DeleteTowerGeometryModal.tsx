import type { GeometryID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteTowerGeometryModalProps {
    geometryId: GeometryID;
    onClose: () => void;
}

export default function DeleteTowerGeometryModal({
    geometryId,
    onClose,
}: DeleteTowerGeometryModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.towerGeometry.delete.useMutation({
        onError(error) {
            toast.error("Failed to delete tower geometry");
            console.log(error);
        },
        async onSuccess(data) {
            await utils.towerGeometry.getAll.invalidate();
            toast.success(`${data.name} has been deleted`);
            onClose();
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({ id: geometryId });
    }

    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
