import { LineID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { CreateTowerModalProps } from "~/features/towers/components/CreateTowerModal/CreateTowerModal";

export default function useCreateTowerModal(lineId: LineID) {
    const createModal = useModal<CreateTowerModalProps>(
        Modals.CreateConductorModal
    );

    return () => {
        createModal.open({
            lineId,
            onClose: createModal.close,
        });
    };
}
