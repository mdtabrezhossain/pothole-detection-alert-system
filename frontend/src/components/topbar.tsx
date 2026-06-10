import { IconCircleChevronsUpFilled } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
    closed: boolean
}
export default function Topbar({ closed }: Props) {
    const [isClosed, setClose] = useState<boolean>(closed);
    function close() {
        setClose(prev => !prev);
    }
    return (
        <>
            <div className={`absolute top-0 left-0 z-50 flex items-center justify-between gap-2 py-2 px-10 w-screen bg-primary text-primary-foreground text-sm transition-transform
            ${isClosed ? '-translate-y-full' : ''}
            `}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, repellendus iste.</p >
                <IconCircleChevronsUpFilled onClick={close} />
            </div >
        </>
    );
}