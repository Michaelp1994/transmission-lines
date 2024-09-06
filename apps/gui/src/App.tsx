import I18nProvider from "./contexts/I18nProvider";
import NiceModal from "@ebay/nice-modal-react";
import RouterProvider from "./contexts/RouterProvider";
import TrpcProvider from "./contexts/TrpcProvider";
import "./styles/globals.css";

export default function App() {
    return (
        <TrpcProvider>
            <I18nProvider>
                <NiceModal.Provider>
                    <RouterProvider />
                </NiceModal.Provider>
            </I18nProvider>
        </TrpcProvider>
    );
}
