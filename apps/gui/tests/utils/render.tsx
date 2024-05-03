import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Toaster } from "sonner";
import TrpcProvider from "~/contexts/TrpcProvider";
import I18nProvider from "~/contexts/I18nProvider";
import ModalProvider from "~/contexts/ModalProvider";

function AllTheProviders({ children }: { children: React.ReactNode }) {
    return (
        <TrpcProvider>
            <I18nProvider>
                <Toaster richColors closeButton position="bottom-center" />
                <ModalProvider>{children}</ModalProvider>
            </I18nProvider>
        </TrpcProvider>
    );
}

const defaultRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export default defaultRender;
