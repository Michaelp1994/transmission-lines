import { styled } from "@linaria/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    buttonVariants,
} from "@repo/ui";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
    onConfirm(): void;
}

export default function ConfirmationDialog({ onConfirm }: ConfirmDialogProps) {
    const { t } = useTranslation("transmissionLine");

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <CloseIcon />
                </Button>
            </AlertDialogTrigger>
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
                    <AlertDialogCancel>{t("form:cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => onConfirm()}
                    >
                        {t("form:delete")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const CloseIcon = styled(Trash2)`
    height: 24px;
    width: 24px;
`;
