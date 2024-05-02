import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useMemo } from "react";
import trpc from "~/utils/trpc";

export default function TrpcProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useMemo(() => new QueryClient(), []);
    const trpcClient = useMemo(() => {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:5001",
                }),
            ],
        });
    }, []);

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
