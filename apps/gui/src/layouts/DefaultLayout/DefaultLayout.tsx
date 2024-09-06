import { Toaster } from "@repo/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import Breadcrumbs from "./components/Breadcrumbs";
import NavBar from "./components/NavBar";

export default function DefaultLayout() {
    return (
        <div>
            <NavBar />

            <div>
                {/* <Breadcrumbs /> */}
                <Outlet />
            </div>
            <Toaster richColors closeButton position="bottom-center" />
            <TanStackRouterDevtools />
        </div>
    );
}
