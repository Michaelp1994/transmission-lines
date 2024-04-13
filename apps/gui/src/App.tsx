import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

import ModalRenderer from "./components/modals/modal-renderer";
import { routeTree } from "./routeTree.gen";
import trpc from "./utils/trpc";

import "@repo/ui/global.css";
import "./utils/i18n";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const App = () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:5001",
                }),
            ],
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ModalRenderer />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default App;
