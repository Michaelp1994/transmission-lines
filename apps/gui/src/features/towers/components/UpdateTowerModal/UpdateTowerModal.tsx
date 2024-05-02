import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui";
import type { TowerID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";

export interface UpdateTowerModalProps {
    towerId: TowerID;
    onClose: () => void;
}

export default function UpdateTowerModal({
    onClose,
    towerId,
}: UpdateTowerModalProps) {
    const { t } = useTranslation("updateTowerModal");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <FormHandler towerId={towerId} onFinish={onClose} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
