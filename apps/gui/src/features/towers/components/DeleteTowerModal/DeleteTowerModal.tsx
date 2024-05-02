import type { TowerID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteTowerModalProps {
    towerId: TowerID;
    onClose: () => void;
}

export default function DeleteTowerModal({
    towerId,
    onClose,
}: DeleteTowerModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.tower.delete.useMutation({
        async onSuccess(data) {
            toast.success("Tower deleted");
            await utils.tower.getAllByLineId.invalidate({
                lineId: data.lineId,
            });
            onClose();
        },
        onError(error) {
            toast.error("Can't delete Tower");
            console.error(error);
        },
    });

    async function handleConfirm() {
        await deleteMutation.mutateAsync({ id: towerId });
    }

    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
