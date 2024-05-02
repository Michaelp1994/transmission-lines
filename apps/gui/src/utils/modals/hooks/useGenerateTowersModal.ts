import type { LineID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { GenerateTowersModalProps } from "~/features/towers/components/GenerateTowersModal/GenerateTowersModal";

export default function useGenerateTowersModal(lineId: LineID) {
    const generateModal = useModal<GenerateTowersModalProps>(
        Modals.GenerateTowersModal
    );

    return () => {
        generateModal.open({
            lineId,
            onClose: generateModal.close,
        });
    };
}
