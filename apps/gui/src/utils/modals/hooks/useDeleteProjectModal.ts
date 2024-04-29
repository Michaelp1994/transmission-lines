import { ProjectID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { DeleteProjectModalProps } from "~/features/projects/components/DeleteProjectModal/DeleteProjectModal";

export default function useDeleteProjectModal(projectId: ProjectID) {
    const deleteModal = useModal<DeleteProjectModalProps>(
        Modals.DeleteProjectModal
    );

    return () => {
        deleteModal.open({
            projectId,
            onClose: deleteModal.close,
        });
    };
}
