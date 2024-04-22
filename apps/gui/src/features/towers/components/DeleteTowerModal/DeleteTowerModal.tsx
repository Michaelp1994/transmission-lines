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
import { LineID, TowerID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

export interface DeleteTowerModalProps {
    towerId: TowerID;
    lineId: LineID;
    onClose: () => void;
}

export default function DeleteTowerModal({
    towerId,
    lineId,
    onClose,
}: DeleteTowerModalProps) {
    const { t } = useTranslation("deleteTowerModal");
    const utils = trpc.useUtils();
    const deleteMutation = trpc.tower.delete.useMutation();
    const handleConfirm = async () => {
        await deleteMutation.mutateAsync({ id: towerId });
        await utils.tower.getAllByLineId.invalidate({
            lineId,
        });
        onClose();
    };
    return (
        <AlertDialog open onOpenChange={onClose}>
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
