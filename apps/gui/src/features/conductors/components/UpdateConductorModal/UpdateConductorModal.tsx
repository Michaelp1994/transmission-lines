import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui";
import { ConductorID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";

import FormHandler from "./FormHandler";

export interface UpdateConductorModalProps {
    conductorId: ConductorID;
    onClose: () => void;
}

export default function UpdateConductorModal({
    conductorId,
    onClose,
}: UpdateConductorModalProps) {
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
                    <FormHandler conductorId={conductorId} onFinish={onClose} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
