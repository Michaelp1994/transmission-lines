import { Modals, modalsConfig } from "./config";

export interface CurrentModal<P> {
    name: Modals;
    props: P;
}

type Handler = (modal: CurrentModal<unknown> | null) => void;

const subs: Set<Handler> = new Set();
let modal: CurrentModal<unknown> | null;

export const currentModal = {
    subscribe(handler: Handler): () => void {
        if (typeof handler === "function") {
            subs.add(handler);
        }

        return () => {
            subs.delete(handler);
        };
    },
    set(currentModal: CurrentModal<unknown> | null) {
        modal = currentModal;
        subs.forEach((handler) => {
            handler(modal);
        });
    },
    get(modal: Modals) {
        return modalsConfig[modal] ?? null;
    },
};
