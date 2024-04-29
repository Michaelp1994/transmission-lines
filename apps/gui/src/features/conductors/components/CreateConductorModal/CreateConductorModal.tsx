import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui";
import { LineID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";

import FormHandler from "./FormHandler";

export interface CreateConductorModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function CreateConductorModal({
    lineId,
    onClose,
}: CreateConductorModalProps) {
    const { t } = useTranslation("createConductorModal");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
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
}
