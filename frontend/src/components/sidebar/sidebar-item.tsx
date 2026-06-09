import { useState } from "react";
import { Link } from "react-router";
import type { SidebarOption } from "./sidebar-data";
import {
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons-react";
import { NavLink } from "react-router";

interface Props {
    option: SidebarOption;
}

function SidebarItem({ option }: Props) {
    const { title, path, icon: Icon, subOptions } = option;

    const [isOpen, setIsOpen] = useState(true);

    function toggle() {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            <li>
                <Link
                    to={path}
                    onClick={subOptions ? toggle : undefined}
                    className="flex justify-between rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <div className="flex items-center gap-2">
                        {Icon && <Icon size={20} />}
                        <span>{title}</span>
                    </div>

                    <div>
                        {subOptions && (
                            isOpen
                                ? <IconChevronDown size={18} />
                                : <IconChevronUp size={18} />
                        )}
                    </div>
                </Link>
            </li>

            <ul
                className={`ml-4 overflow-hidden border-l pl-3 transition-all duration-300 ease
                    ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
                `}
            >
                {subOptions?.map((opt, i) => (
                    <li key={i}>
                        <NavLink
                            to={opt.path}
                            className={({ isActive }) =>
                                `flex rounded-sm px-3 py-2 text-sm transition-colors
                                ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`
                            }
                        >
                            <div className="flex items-center gap-2">
                                {opt.icon && <opt.icon size={20} />}
                                <span>{opt.title}</span>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SidebarItem;
