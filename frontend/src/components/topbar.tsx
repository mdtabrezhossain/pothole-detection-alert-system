import { useTopBar } from "@/contexts/topbar";
import { IconCircleChevronsUpFilled } from "@tabler/icons-react";


export default function Topbar() {
    const { message, writeMessage, isOpen, open } = useTopBar();

    return (
        <>
            <div className={`absolute top-0 left-0 z-50 flex items-center justify-between gap-2 py-2 px-10 w-screen bg-primary text-primary-foreground text-sm transition-transform
            ${isOpen ? null : '-translate-y-full'}
            `}>
                <p>{message}</p >
                <IconCircleChevronsUpFilled
                    onClick={() => {
                        open(false);
                        writeMessage(null);
                    }}
                />
            </div >
        </>
    );
}