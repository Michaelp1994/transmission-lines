import { LineID } from "@repo/validators/Ids";

import { Modals } from "../config";
import useModal from "../use-modal";

import { CreateConductorModalProps } from "~/features/conductors/components/CreateConductorModal/CreateConductorModal";

export default function useCreateConductorModal(lineId: LineID) {
    const createModal = useModal<CreateConductorModalProps>(
        Modals.CreateConductorModal
    );

    return () => {
        createModal.open({
            lineId,
            onClose: createModal.close,
        });
    };
}
