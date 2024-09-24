import NiceModal from "@ebay/nice-modal-react";
import type { TowerID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteTowerModalProps {
    towerId: TowerID;
}

export default NiceModal.create(({ towerId }: DeleteTowerModalProps) => {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.tower.delete.useMutation({
        async onSuccess(data) {
            toast.success("Tower deleted");
            await utils.tower.getAllByLineId.invalidate({
                lineId: data.lineId,
            });
        },
        onError(error) {
            toast.error("Can't delete Tower");
            console.error(error);
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({ id: towerId });
    }

    return <BaseDeleteModal onConfirm={handleConfirm} />;
});
