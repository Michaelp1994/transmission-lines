import { SourceID } from "@repo/validators/Ids";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteSourceModalProps {
    onClose: () => void;
    sourceId: SourceID;
}

export default function DeleteSourceModal({
    onClose,
    sourceId,
}: DeleteSourceModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.source.delete.useMutation({
        async onSuccess(values) {
            toast.success(`Source ${values.name} deleted`);
            await utils.source.getAllByProjectId.invalidate({
                projectId: values.projectId,
            });
        },
        onError(error) {
            toast.error("Failed to delete source");
            console.error("Failed to delete source", error);
        },
    });
    async function handleConfirm() {
        await deleteMutation.mutateAsync({
            id: sourceId,
        });
    }
    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
