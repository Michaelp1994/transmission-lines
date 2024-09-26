import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";
import NavBar from "~/components/NavBar";

export interface RouterContext {
    text?: string;
    link?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: DefaultLayout,
});

export function DefaultLayout() {
    return (
        <div className="h-full w-full">
            <NavBar />
            <div className="p-4 max-w-7xl mx-auto">
                <Outlet />
            </div>
            <Toaster richColors closeButton position="bottom-center" />
            <TanStackRouterDevtools />
        </div>
    );
}
