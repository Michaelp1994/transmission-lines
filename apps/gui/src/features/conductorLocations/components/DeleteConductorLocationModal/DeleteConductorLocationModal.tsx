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
import { useTranslation } from "react-i18next";

import trpc from "@/utils/trpc";

export interface DeleteConductorLocationModalProps {
    conductorLocationId: number;
    onClose: () => void;
}

const DeleteConductorModal: React.FC<DeleteConductorLocationModalProps> = ({
    conductorLocationId,
    onClose,
}) => {
    const { t } = useTranslation("deleteConductorLocationModal");
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductorLocations.delete.useMutation();
    const handleConfirm = async () => {
        // handle delete
        const data = await deleteMutation.mutateAsync({
            locationId: conductorLocationId,
        });
        await utils.conductorLocations.getAllByGeometryId.invalidate({
            geometryId: data.geometryId,
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
