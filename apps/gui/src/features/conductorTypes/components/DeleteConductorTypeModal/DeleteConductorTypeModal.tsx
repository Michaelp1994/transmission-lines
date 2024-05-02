import type { ConductorTypeID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteConductorTypeModalProps {
    typeId: ConductorTypeID;
    onClose: () => void;
}

export default function DeleteConductorTypeModal({
    typeId,
    onClose,
}: DeleteConductorTypeModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductorType.delete.useMutation({
        onError: (error) => {
            toast.error("Failed to delete conductor Type");
            console.log(error);
        },
        onSuccess: async (data) => {
            await utils.conductorType.getAll.invalidate();
            toast.success(`${data.name} has been deleted`);
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({ id: typeId });
    }

    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
