import type { ConductorID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteConductorModalProps {
    conductorId: ConductorID;
    onClose: () => void;
}

export default function DeleteConductorModal({
    onClose,
    conductorId,
}: DeleteConductorModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductor.delete.useMutation({
        async onSuccess(data) {
            toast.success("Conductor deleted");
            await utils.conductor.getAllByLineId.invalidate({
                lineId: data.lineId,
            });
            onClose();
        },
        onError(error) {
            toast.error("Can't delete Conductor");
            console.error(error);
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({ id: conductorId });
    }

    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
