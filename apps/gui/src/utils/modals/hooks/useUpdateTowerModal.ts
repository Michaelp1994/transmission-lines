import { TowerID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { UpdateTowerModalProps } from "~/features/towers/components/UpdateTowerModal/UpdateTowerModal";

export default function useUpdateTowerModal(towerId: TowerID) {
    const modal = useModal<UpdateTowerModalProps>(Modals.UpdateTowerModal);

    return () => {
        modal.open({
            towerId,
            onClose: modal.close,
        });
    };
}
