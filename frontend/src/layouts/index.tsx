import { useState } from "react";
import { Outlet } from "react-router";
import {
    IconLayoutSidebarLeftExpandFilled
} from "@tabler/icons-react";
import Sidebar from "@/components/sidebar/sidebar";

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    return (
        <>
            {!isSidebarOpen && (
                <button
                    className="fixed top-5 left-5 z-10 rounded-md border bg-background p-2 transition-colors duration-300 ease shadow-md hover:bg-accent"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <IconLayoutSidebarLeftExpandFilled />
                </button>
            )}

            <header className={`fixed top-0 left-0 z-10 h-screen w-70 transform border-r bg-sidebar transition-transform duration-300 ease
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}