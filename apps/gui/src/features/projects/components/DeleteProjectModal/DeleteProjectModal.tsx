import type { ProjectID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteProjectModalProps {
    onClose: () => void;
    projectId: ProjectID;
}

export default function DeleteProjectModal({
    onClose,
    projectId,
}: DeleteProjectModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.project.delete.useMutation({
        async onSuccess(values) {
            toast.success(`Project ${values.name} deleted`);
            await utils.project.getAll.invalidate();
            onClose();
        },
        onError(error) {
            toast.error("Failed to delete project.");
            console.error(error);
        },
    });

    async function handleConfirm() {
        await deleteMutation.mutateAsync({ id: projectId });
    }

    return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
}
