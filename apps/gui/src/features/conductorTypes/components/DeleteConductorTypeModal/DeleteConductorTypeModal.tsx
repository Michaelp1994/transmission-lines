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
import { ConductorTypeID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("deleteConductorTypeModal");
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
                            onClick={() =>
                                deleteMutation.mutate({ id: typeId })
                            }
                        >
                            {t("form:delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    );
}
