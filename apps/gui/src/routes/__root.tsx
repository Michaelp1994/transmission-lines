import { TooltipProvider } from "@repo/ui/tooltip";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

import type trpc from "~/utils/trpc";

import NavBar from "~/components/NavBar";
import StatusBar from "~/components/StatusBar";

export interface RouterContext {
    trpc: typeof trpc;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: DefaultLayout,
});

export function DefaultLayout() {
    return (
        <div className="h-full w-full grid grid-rows-[auto_1fr_auto]">
            <TooltipProvider>
                <NavBar />
                <Outlet />
                <StatusBar />
                <Toaster closeButton position="bottom-right" richColors />
                {/* <TanStackRouterDevtools /> */}
            </TooltipProvider>
        </div>
    );
}
