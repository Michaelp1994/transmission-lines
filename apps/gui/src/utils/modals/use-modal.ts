import type { Modals } from "./config";
import { currentModal } from "./current-modal";

const useModal = <P>(name: Modals) => {
    return {
        open: (props: P) => {
            currentModal.set({ name, props });
        },
        close: () => {
            currentModal.set(null);
        },
    };
};

export default useModal;
