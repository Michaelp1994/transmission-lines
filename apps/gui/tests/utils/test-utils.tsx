import { type RenderOptions, render } from "@testing-library/react";
import React, { type ReactElement } from "react";

import I18nProvider from "~/contexts/I18nProvider";

function AllTheProviders({ children }: { children: React.ReactNode }) {
    return <I18nProvider>{children}</I18nProvider>;
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
