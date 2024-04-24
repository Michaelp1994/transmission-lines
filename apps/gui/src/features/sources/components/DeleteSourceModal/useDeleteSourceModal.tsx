import { SourceID } from "@repo/validators/schemas/Ids.schema";

import { DeleteSourceModalProps } from "./DeleteSourceModal";

import { Modals } from "~/components/modals/config";
import useModal from "~/components/modals/use-modal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export default function useDeleteSourceModal(sourceId: SourceID) {
    const deleteModal = useModal<DeleteSourceModalProps>(
        Modals.DeleteSourceModal
    );
    const utils = trpc.useUtils();
    const deleteMutation = trpc.source.delete.useMutation({
        onSuccess(values) {
            toast.success(`Source ${values.name} deleted`);
        },
        onError(error) {
            toast.error("Failed to delete source");
            console.error("Failed to delete source", error);
        },
    });

    return () => {
        deleteModal.open({
            onConfirm: async () => {
                const results = await deleteMutation.mutateAsync({
                    id: sourceId,
                });
                await utils.source.getAllByProjectId.invalidate({
                    projectId: results.projectId,
                });
                deleteModal.close();
            },
            onClose: deleteModal.close,
        });
    };
}
