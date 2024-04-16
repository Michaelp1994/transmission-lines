import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";

import UpdateConductorLocationForm from "./UpdateConductorLocationForm";

import trpc from "@/utils/trpc";

export interface UpdateConductorLocationModalProps {
    conductorLocationId: number;
    onClose: () => void;
}

const UpdateConductorModal: React.FC<UpdateConductorLocationModalProps> = ({
    conductorLocationId,
    onClose,
}) => {
    const { t } = useTranslation("updateConductorModal");
    const { data, error, isLoading, isError } =
        trpc.conductorLocations.getById.useQuery({
            locationId: conductorLocationId,
        });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error: {error.message}</div>;
    }

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
                    <UpdateConductorLocationForm
                        data={data}
                        onSubmit={onClose}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default UpdateConductorModal;
