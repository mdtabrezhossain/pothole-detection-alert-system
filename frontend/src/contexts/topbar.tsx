import { createContext, ReactNode, useContext, useState } from "react";


interface ContextValues {
    message: string | null;
    writeMessage(message: string | null): void;
    isOpen: boolean;
    open(val: boolean): void;
};

interface Props {
    children: ReactNode;
}

const Context = createContext<ContextValues | null>(null);

export function TopBarProvider({ children }: Props) {
    const Provider = Context.Provider;
    const [message, setMessage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function open(val: boolean) {
        setIsOpen(val);
    }

    function writeMessage(message: string) {
        setMessage(message);
    }

    const values = { message, writeMessage, isOpen, open };

    return (
        <Provider value={values}>
            {children}
        </Provider>
    );
}

export function useTopBar() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no top bar context found");
    }

    return context;
}