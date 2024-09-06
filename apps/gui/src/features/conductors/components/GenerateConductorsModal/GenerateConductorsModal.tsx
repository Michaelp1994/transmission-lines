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

export interface GenerateConductorsModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function GenerateConductorsModal({
    lineId,
    onClose,
}: GenerateConductorsModalProps) {
    const { t } = useTranslation("generateConductors");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <FormWrapper lineId={lineId} onFinish={onClose} />
            </DialogContent>
        </Dialog>
    );
}
