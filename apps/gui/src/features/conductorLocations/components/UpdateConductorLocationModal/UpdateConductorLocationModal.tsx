import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui/dialog";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";

export interface UpdateConductorLocationModalProps {
    conductorLocationId: number;
    onClose: () => void;
}

export default function UpdateConductorLocationModal({
    conductorLocationId,
    onClose,
}: UpdateConductorLocationModalProps) {
    const { t } = useTranslation("updateConductorModal");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <FormHandler
                        conductorLocationId={conductorLocationId}
                        onSubmit={onClose}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
