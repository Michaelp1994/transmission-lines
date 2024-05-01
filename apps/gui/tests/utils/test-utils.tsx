import { type RenderOptions, render } from "@testing-library/react";
import React, { type ReactElement } from "react";

import I18nProvider from "~/contexts/I18nProvider";
import ModalProvider from "~/contexts/ModalProvider";
import MockTrpcProvider, { TrpcMockFn } from "~tests/mocks/TrpcProvider";

const defaultRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: I18nProvider, ...options });

interface AllTheProvidersProps {
    children: React.ReactNode;
    trpcFn: TrpcMockFn;
}

function AllTheProviders({ children, trpcFn }: AllTheProvidersProps) {
    return (
        <MockTrpcProvider mockFn={trpcFn}>
            <I18nProvider>
                <ModalProvider>{children}</ModalProvider>
            </I18nProvider>
        </MockTrpcProvider>
    );
}

export const createRender = (trpcFn: TrpcMockFn) => {
    return (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
        render(ui, {
            wrapper: (props) => <AllTheProviders {...props} trpcFn={trpcFn} />,
            ...options,
        });
};

export * from "@testing-library/react";
export { defaultRender as render };
