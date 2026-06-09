import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "@/contexts/theme";


export default function ThemeToggle() {
    const { theme, toggle } = useTheme();

    return theme === "dark" ? (
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
    );
}

