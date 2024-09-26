import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import type { GeometryID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import CreateConductorLocationForm from "../CreateConductorLocationForm";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface CreateConductorLocationModalProps {
    geometryId: GeometryID;
}

export default NiceModal.create(
    ({ geometryId }: CreateConductorLocationModalProps) => {
        const modal = useModal();
        const { t } = useTranslation("createConductorLocationModal");
        return (
            <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <CreateConductorLocationForm geometryId={geometryId} />
                </DialogContent>
            </Dialog>
        );
    }
);
