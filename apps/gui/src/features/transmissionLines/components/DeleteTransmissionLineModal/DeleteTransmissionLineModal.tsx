import { LineID } from "@repo/validators/Ids";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteTransmissionLineModalProps {
    onClose: () => void;
    lineId: LineID;
}

export default function DeleteTransmissionLineModal({
    onClose,
    lineId,
}: DeleteTransmissionLineModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.transmissionLine.delete.useMutation({
        async onSuccess(values) {
            toast.success(`Transmission Line ${values.name} deleted`);
            await utils.transmissionLine.getAllByProjectId.invalidate({
                projectId: values.projectId,
            });
        },
        onError(error) {
            toast.error("Failed to delete transmission Line");
            console.error(error);
        },
    });

    async function handleConfirm() {
        await deleteMutation.mutateAsync({
            id: lineId,
        });
    }
    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
