import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, type TRPCLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { observable } from "@trpc/server/observable";
import { useState } from "react";
import type { Mock } from "vitest";

// type MockFn = (op: any) => Promise<any>;

export type TrpcMockFn = Mock;

const trpc = createTRPCReact();

function customLinkFactory(mockFn: TrpcMockFn) {
    const customLink: TRPCLink<any> = () => {
        // here we just got initialized in the app - this happens once per app
        // useful for storing cache for instance
        return ({ op }) => {
            // this is when passing the result to the next link
            // each link needs to return an observable which propagates results
            return observable((observer) => {
                // console.log("performing operation:", op);
                let _res: any;

                mockFn(op.input)
                    .then((res) => {
                        _res = res;
                        observer.next({
                            context: {},
                            result: {
                                type: "data",
                                data: res,
                            },
                        });
                        observer.complete();
                    })
                    .catch((error) => {
                        observer.error(
                            TRPCClientError.from(error, {
                                meta: _res?.meta,
                            })
                        );
                    });

                return () => {};
            });
        };
    };

    return customLink;
}

interface TrpcProviderProps {
    children: React.ReactNode;
    mockFn: TrpcMockFn;
}

export default function MockTrpcProvider({
    children,
    mockFn,
}: TrpcProviderProps) {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
    });
    const [trpcClient] = useState(() => {
        return trpc.createClient({
            links: [
                customLinkFactory(mockFn),
                // httpBatchLink({ url: "http://localhost:5001" }),
            ],
        });
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
