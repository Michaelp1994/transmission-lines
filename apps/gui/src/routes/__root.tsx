import { createRootRouteWithContext } from "@tanstack/react-router";

import DefaultLayout from "~/layouts/DefaultLayout";

export interface RouterContext {
    text?: string;
    link?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: DefaultLayout,
    beforeLoad: () => ({
        text: "Home",
    }),
});
