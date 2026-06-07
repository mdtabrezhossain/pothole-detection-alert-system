import { useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";


export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    function toggle() {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    }

    return (
        theme === 'light' ? (
            <IconMoon
                className="cursor-pointer hover:text-accent-foreground"
                onClick={toggle}
                size={20}
            />
        ) : (
            <IconSun
                className="cursor-pointer hover:text-accent-foreground"
                onClick={toggle}
                size={20}
            />
        )
    );
}

