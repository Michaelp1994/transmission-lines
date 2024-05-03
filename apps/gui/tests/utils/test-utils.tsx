import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "sonner";
import I18nProvider from "~/contexts/I18nProvider";
import ModalProvider from "~/contexts/ModalProvider";
import MockTrpcProvider, { type TrpcMockFn } from "~tests/mocks/TrpcProvider";

interface AllTheProvidersProps {
    children: ReactNode;
    trpcFn: TrpcMockFn;
}

function AllTheProviders({ children, trpcFn }: AllTheProvidersProps) {
    return (
        <MockTrpcProvider mockFn={trpcFn}>
            <I18nProvider>
                <Toaster richColors closeButton position="bottom-center" />
                <ModalProvider>{children}</ModalProvider>
            </I18nProvider>
        </MockTrpcProvider>
    );
}

export const createRender = (trpcFn: TrpcMockFn) => {
    return (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
        return render(ui, {
            wrapper: (props) => <AllTheProviders {...props} trpcFn={trpcFn} />,
            ...options,
        });
    };
};

export * from "@testing-library/react";

export { default as render } from "./render";
