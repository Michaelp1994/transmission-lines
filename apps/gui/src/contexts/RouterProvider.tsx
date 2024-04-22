import {
    RouterProvider as ReactRouterProvider,
    createRouter,
} from "@tanstack/react-router";

import { routeTree } from "~/routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default function RouterProvider() {
    return <ReactRouterProvider router={router} />;
}