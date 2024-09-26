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
import NiceModal from "@ebay/nice-modal-react";

export interface CreateTowerModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default NiceModal.create(
    ({ lineId, onClose }: CreateTowerModalProps) => {
        const { t } = useTranslation("addTowerModal");

        return (
            <Dialog open={modal.visible} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <FormHandler lineId={lineId} onClose={onClose} />
                </DialogContent>
            </Dialog>
        );
    }
);
