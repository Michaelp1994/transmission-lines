import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    buttonVariants,
} from "@repo/ui";
import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

export interface DeleteProjectModalProps {
    projectId: ProjectID;
    onClose: () => void;
}

export default function DeleteProjectModal({
    projectId,
    onClose,
}: DeleteProjectModalProps) {
    const { t } = useTranslation("deleteProjectModal");
    const utils = trpc.useUtils();
    const deleteMutation = trpc.project.delete.useMutation();
    const handleConfirm = async () => {
        await deleteMutation.mutateAsync({ id: projectId });
        await utils.project.getAll.invalidate();
    };
    return (
        <AlertDialog open defaultOpen onOpenChange={onClose}>
            <AlertDialogPortal>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t("general:confirmationTitle")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("general:cannotUndo")}
                            <br />
                            {t("deletionWarning")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {t("form:cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className={buttonVariants({
                                variant: "destructive",
                            })}
                            onClick={() => handleConfirm()}
                        >
                            {t("form:delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    );
}
