import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import trpc from "./utils/trpc";
import "@repo/ui/global.css";
import "./utils/i18n";
import ModalRenderer from "./components/modals/modal-renderer";

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
