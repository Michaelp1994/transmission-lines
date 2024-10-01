import { TooltipProvider } from "@repo/ui/tooltip";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import NavBar from "~/components/NavBar";
import StatusBar from "~/components/StatusBar";

export interface RouterContext {
    text?: string;
    link?: string;
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
                <Toaster richColors closeButton position="bottom-center" />
            </TooltipProvider>
        </div>
    );
}
