import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui";
import { GeometryID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

import CreateConductorLocationForm from "./CreateConductorLocationForm";

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
                <CreateConductorLocationForm
                    onSubmit={onClose}
                    geometryId={geometryId}
                />
            </DialogContent>
        </Dialog>
    );
}
