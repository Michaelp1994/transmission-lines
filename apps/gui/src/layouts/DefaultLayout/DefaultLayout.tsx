import { styled } from "@linaria/react";
import { Toaster } from "@repo/ui";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Breadcrumbs from "./components/Breadcrumbs";
import NavBar from "./components/NavBar";

export default function DefaultLayout() {
    return (
        <Wrapper>
            <NavBar />

            <OutletContainer>
                <Breadcrumbs />
                <Outlet />
            </OutletContainer>
            <Toaster position="bottom-center" richColors closeButton />
            <TanStackRouterDevtools />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: rgb(249 250 251);
    // background-color: var(--background);
    color: var(--foreground);
    min-height: 100vh;
    height: 100%;
`;
const OutletContainer = styled.main`
    /* max-width: 1440px; */
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
`;
