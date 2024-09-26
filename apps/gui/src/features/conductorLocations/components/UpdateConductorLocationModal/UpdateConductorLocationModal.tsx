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
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import type { LocationID } from "@repo/validators/Ids";

export interface UpdateConductorLocationModalProps {
    conductorLocationId: LocationID;
}

export default NiceModal.create(
    ({ conductorLocationId }: UpdateConductorLocationModalProps) => {
        const { t } = useTranslation("updateConductorModal");
        const modal = useModal();
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
                            conductorLocationId={conductorLocationId}
                        />
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        );
    }
);
