import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui";
import type { LineID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";

export interface CreateTowerModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function CreateTowerModal({
    lineId,
    onClose,
}: CreateTowerModalProps) {
    const { t } = useTranslation("addTowerModal");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
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
