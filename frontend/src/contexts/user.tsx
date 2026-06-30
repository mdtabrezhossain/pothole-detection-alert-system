import { createContext, ReactNode, useContext, useState } from "react";


interface ContextValues {
    isLoggedIn: boolean;
    userId: string | null;
    setIsLoggedIn(val: boolean): void;
    handleSetUserId(val: string): void;
}

interface Props {
    children: ReactNode;
}

const Context = createContext<ContextValues | null>(null);

export function UserProvider({ children }: Props) {
    const Provider = Context.Provider;
    const [isLoggedIn, setLogin] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    function setIsLoggedIn(val: boolean) {
        setLogin(val);
    }

    function handleSetUserId(val: string) {
        setUserId(val);
    }

    const values = { isLoggedIn, userId, setIsLoggedIn, handleSetUserId };

    return (
        <Provider value={values}>
            {children}
        </Provider>
    );
}

export function useUser() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no user context found");
    }

    return context;
}