import type { TowerID } from "@repo/validators/Ids";
import { Modals } from "../config";
import useModal from "../use-modal";
import type { TowerParametersModalProps } from "~/features/towers/components/TowerParametersModal/TowerParametersModal";

export default function useTowerParametersModal(towerId: TowerID) {
    const modal = useModal<TowerParametersModalProps>(
        Modals.TowerParametersModal
    );

    return () => {
        modal.open({
            towerId,
            onClose: modal.close,
        });
    };
}
