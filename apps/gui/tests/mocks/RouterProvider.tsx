// Create a new router instance

import { createContext } from "react";

interface MockRouterProviderProps {
    children: React.ReactNode;
}

const Context = createContext({});

export default function MockRouterProvider({
    children,
}: MockRouterProviderProps) {
    const router = {};

    return <Context.Provider value={router}>{children}</Context.Provider>;
}
