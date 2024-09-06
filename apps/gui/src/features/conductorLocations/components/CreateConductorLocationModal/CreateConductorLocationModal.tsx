import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import type { GeometryID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import FormHandler from "./FormHandler";

export interface CreateConductorLocationModalProps {
    geometryId: GeometryID;
    onClose: () => void;
}

export default function CreateConductorLocationModal({
    geometryId,
    onClose,
}: CreateConductorLocationModalProps) {
    const { t } = useTranslation("createConductorLocationModal");

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <FormHandler geometryId={geometryId} onFinish={onClose} />
            </DialogContent>
        </Dialog>
    );
}
