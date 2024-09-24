import NiceModal from "@ebay/nice-modal-react";
import type { ProjectID } from "@repo/validators/Ids";
import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteProjectModalProps {
    onClose: () => void;
    projectId: ProjectID;
}

export default NiceModal.create(
    ({ onClose, projectId }: DeleteProjectModalProps) => {
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

        function handleConfirm() {
            deleteMutation.mutate({ id: projectId });
        }

        return <BaseDeleteModal onClose={onClose} onConfirm={handleConfirm} />;
    }
);
