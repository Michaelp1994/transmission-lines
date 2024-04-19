import ModalRenderer from "./components/modals/modal-renderer";
import I18nProvider from "./contexts/I18nProvider";
import RouterProvider from "./contexts/RouterProvider";
import TrpcProvider from "./contexts/TrpcProvider";
import "@repo/ui/global.css";

export default function App() {
    return (
        <TrpcProvider>
            <I18nProvider>
                <ModalRenderer />
                <RouterProvider />
            </I18nProvider>
        </TrpcProvider>
    );
}
