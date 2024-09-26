import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui/dialog";
import type { ConductorID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";
import NiceModal from "@ebay/nice-modal-react";

export interface UpdateConductorModalProps {
    conductorId: ConductorID;
    onClose: () => void;
}

export default NiceModal.create(
    ({ conductorId, onClose }: UpdateConductorModalProps) => {
        const { t } = useTranslation("updateConductorModal");

        return (
            <Dialog open={modal.visible} onOpenChange={onClose}>
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
                            conductorId={conductorId}
                            onFinish={onClose}
                        />
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        );
    }
);
