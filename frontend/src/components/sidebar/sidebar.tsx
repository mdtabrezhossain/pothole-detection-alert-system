import ThemeToggle from "../theme-toggle";
import data from "../../data/sidebar";
import SidebarItem from "./sidebar-item";

import {
    IconCircleDottedLetterP,
    IconLetterA,
    IconLetterM,
    IconLetterP,
    IconLetterS,
    IconLayoutSidebarRightExpandFilled
} from "@tabler/icons-react";

interface Props {
    onClose(): void;
}

export default function Sidebar({ onClose }: Props) {

    return (
        <nav className="h-full space-y-5 bg-sidebar p-3 text-sidebar-foreground text-sm">
            <div className="mb-10 mt-3 flex items-center justify-between pr-2">
                <div className="flex items-center gap-1">
                    <IconCircleDottedLetterP size={40} />
                    <IconLetterM size={15} />
                    <IconLetterA size={15} />
                    <IconLetterP size={15} />
                    <IconLetterS size={15} />
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <button
                        className="rounded-md p-1 hover:bg-accent"
                        onClick={onClose}
                    >
                        <IconLayoutSidebarRightExpandFilled size={20} />
                    </button>
                </div>
            </div>

            <ul className="space-y-2">
                {data.map((option, i) => (
                    <SidebarItem option={option} key={i} />
                ))}
            </ul>

        </nav>
    );
}