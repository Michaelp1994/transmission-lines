import { Modals } from "./config";
import { currentModal } from "./current-modal";

const useModal = <P>(name: Modals) => ({
    open: (props: P) => {
        currentModal.set({ name, props });
    },
    close: () => {
        currentModal.set(null);
    },
});

export default useModal;
