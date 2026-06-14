import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ContextValues {
    theme: 'light' | 'dark';
    toggle(): void;
}

const Context = createContext<ContextValues | null>(null);

interface Props {
    children: ReactNode
}

export function ThemeProvider({ children }: Props) {
    const defaultTheme = localStorage.getItem('app-theme') === 'dark' ? 'dark' : 'light';
    const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
    const Provider = Context.Provider;

    function toggle() {
        setTheme((prev) => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('app-theme', newTheme);

            return newTheme;
        });
    }

    useEffect(() => {
        document.body.classList.remove("dark", "light");
        document.body.classList.add(theme);
    }, [theme]);


    return (
        <Provider value={{ theme, toggle }}>
            {children}
        </Provider>
    );
}

export function useTheme() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no theme context found");
    }

    return context;
}