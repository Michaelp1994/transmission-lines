import { createContext, useContext, useState } from "react";

const DnDContext = createContext([null, (_) => {}]);

interface DnDProviderProps {
    children: React.ReactNode;
}

export const DnDProvider = ({ children }: DnDProviderProps) => {
    const [type, setType] = useState(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
};

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
};
