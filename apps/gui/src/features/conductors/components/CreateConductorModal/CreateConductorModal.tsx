import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import type { LineID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface CreateConductorModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: CreateConductorModalProps) => {
    const modal = useModal();
    const { t } = useTranslation("createConductorModal");

    return (
        <Dialog open defaultOpen onOpenChange={() => modal.hide()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <FormHandler lineId={lineId} onFinished={onClose} />
            </DialogContent>
        </Dialog>
    );
});
