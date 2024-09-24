import I18nProvider from "./contexts/I18nProvider";
import RouterProvider from "./contexts/RouterProvider";
import TrpcProvider from "./contexts/TrpcProvider";
import "./styles/globals.css";
import ModalProvider from "./contexts/ModalProvider";

export default function App() {
    return (
        <TrpcProvider>
            <I18nProvider>
                <ModalProvider>
                    <RouterProvider />
                </ModalProvider>
            </I18nProvider>
        </TrpcProvider>
    );
}
