import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import type { LineID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormWrapper from "./FormWrapper";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface GenerateConductorsModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: GenerateConductorsModalProps) => {
    const { t } = useTranslation("generateConductors");
    const modal = useModal();
    return (
        <Dialog open defaultOpen onOpenChange={() => modal.hide()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <FormWrapper lineId={lineId} />
            </DialogContent>
        </Dialog>
    );
});
