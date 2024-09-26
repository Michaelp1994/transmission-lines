import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";

import { useTranslation } from "react-i18next";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export default NiceModal.create(() => {
    const { t } = useTranslation("settingsModal");
    const modal = useModal();
    return (
        <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
});
