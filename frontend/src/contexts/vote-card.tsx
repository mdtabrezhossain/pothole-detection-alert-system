import { createContext, ReactNode, useContext, useState } from "react";


interface ContextValues {
    potholeId: number | null
    isOpen: boolean;
    handleSetPotholeId(id: number): void,
    open(val: boolean): void;
}

interface Props {
    children: ReactNode;
}

const Context = createContext<ContextValues | null>(null);

export function VoteCardProvider({ children }: Props) {
    const Provider = Context.Provider;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [potholeId, setPotholeId] = useState<number | null>(null);

    function open(val: boolean) {
        setIsOpen(val);
    }

    function handleSetPotholeId(id: number) {
        setPotholeId(id);
    }


    const values = { potholeId, handleSetPotholeId, isOpen, open };

    return (
        <Provider value={values}>
            {children}
        </Provider>
    );
}

export function useVoteCard() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no top bar context found");
    }

    return context;
}