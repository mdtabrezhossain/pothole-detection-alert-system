import { createContext, ReactNode, useContext, useState } from "react";


interface ContextValues {
    imageSrc: string | null
    isOpen: boolean;
    handleSetImageSrc(src: string): void,
    open(val: boolean): void;
}

interface Props {
    children: ReactNode;
}

const Context = createContext<ContextValues | null>(null);

export function ImageCardProvider({ children }: Props) {
    const Provider = Context.Provider;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    function open(val: boolean) {
        setIsOpen(val);
    }

    function handleSetImageSrc(src: string) {
        setImageSrc(src);
    }


    const values = { imageSrc, handleSetImageSrc, isOpen, open };

    return (
        <Provider value={values}>
            {children}
        </Provider>
    );
}

export function useImageCard() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("no image card context found");
    }

    return context;
}