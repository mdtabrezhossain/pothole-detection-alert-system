import { createContext, ReactNode, useContext, useState } from "react";


interface ContextValues {
    potholeId: number | null
    handleSetPotholeId(id: number | null): void,
}

interface Props {
    children: ReactNode;
}

const Context = createContext<ContextValues | null>(null);

export function PotholeProvider({ children }: Props) {
    const Provider = Context.Provider;
    const [potholeId, setPotholeId] = useState<number | null>(null);

    function handleSetPotholeId(id: number) {
        setPotholeId(id);
    }

    const values = { potholeId, handleSetPotholeId };

    return (
        <Provider value={values}>
            {children}
        </Provider>
    );
}

export function usePothole() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no pothole context found");
    }

    return context;
}