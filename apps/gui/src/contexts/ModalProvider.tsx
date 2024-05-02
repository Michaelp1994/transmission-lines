import { Suspense, useEffect, useState } from "react";
import { type CurrentModal, currentModal } from "~/utils/modals/current-modal";

interface ModalProviderProps {
    children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
    return (
        <>
            <ModalRenderer />
            {children}
        </>
    );
}

function ModalRenderer() {
    const [modal, setModal] = useState<CurrentModal<any> | null>(null);

    useEffect(() => currentModal.subscribe(setModal), []);

    if (modal) {
        const Modal = currentModal.get(modal.name);

        return (
            <Suspense>
                <Modal {...modal.props} />
            </Suspense>
        );
    }

    return null;
}
