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
import { ConductorID, LineID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

export interface DeleteConductorModalProps {
    conductorId: ConductorID;
    lineId: LineID;
    onClose: () => void;
}

const DeleteConductorModal: React.FC<DeleteConductorModalProps> = ({
    conductorId,
    lineId,
    onClose,
}) => {
    const { t } = useTranslation("transmissionLine");
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductor.delete.useMutation();
    const handleConfirm = async () => {
        await deleteMutation.mutateAsync({ id: conductorId });
        await utils.conductor.getAllByLineId.invalidate({
            lineId,
        });
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
};

export default DeleteConductorModal;
