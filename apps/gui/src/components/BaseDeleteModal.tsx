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
} from "@repo/ui/alert-dialog";
import { buttonVariants } from "@repo/ui/button";
import { useTranslation } from "react-i18next";

interface BaseModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function BaseDeleteModal({
    onConfirm,
    onClose,
}: BaseModalProps) {
    const { t } = useTranslation("general");

    return (
        <AlertDialog open defaultOpen onOpenChange={onClose}>
            <AlertDialogPortal>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t("confirmationTitle")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("cannotUndo")}
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
                            onClick={onConfirm}
                        >
                            {t("form:delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    );
}
