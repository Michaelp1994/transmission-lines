import type { LineID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { GenerateConductorsModalProps } from "~/features/conductors/components/GenerateConductorsModal/GenerateConductorsModal";

export default function useGenerateConductorsModal(lineId: LineID) {
    const generateModal = useModal<GenerateConductorsModalProps>(
        Modals.GenerateConductorsModal
    );

    return () => {
        generateModal.open({
            lineId,
            onClose: generateModal.close,
        });
    };
}
