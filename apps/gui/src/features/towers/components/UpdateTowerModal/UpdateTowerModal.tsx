import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui/dialog";
import type { TowerID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface UpdateTowerModalProps {
    towerId: TowerID;
}

export default NiceModal.create(({ towerId }: UpdateTowerModalProps) => {
    const modal = useModal();
    const { t } = useTranslation("updateTowerModal");

    return (
        <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <FormHandler towerId={towerId} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
});
