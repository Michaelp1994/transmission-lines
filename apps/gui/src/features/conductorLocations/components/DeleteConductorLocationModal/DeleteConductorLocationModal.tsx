import { LocationID } from "@repo/validators/Ids";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export interface DeleteConductorLocationModalProps {
    locationId: LocationID;
    onClose: () => void;
}

export default function DeleteConductorLocationModal({
    locationId,
    onClose,
}: DeleteConductorLocationModalProps) {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductorLocations.delete.useMutation({
        async onSuccess(data) {
            toast.success("Conductor location deleted");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId: data.geometryId,
            });
            onClose();
        },
        onError(error) {
            toast.error("Can't delete Conductor Location");
            console.error(error);
        },
    });

    const handleConfirm = async () => {
        await deleteMutation.mutateAsync({
            locationId,
        });
    };
    return <BaseDeleteModal onConfirm={handleConfirm} onClose={onClose} />;
}
