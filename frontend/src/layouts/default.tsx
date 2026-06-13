import { Outlet } from "react-router";
import Topbar from "@/components/topbar";
import BaseLayout from "@/layouts/base";


export default function DefaultLayout() {
    return (
        <>
            <BaseLayout />

            <main className="h-screen p-3">
                <Topbar closed={true} />

                <div className="h-svh w-full rounded-sm bg-secondary text-secondary-foreground shadow-2xl">
                    <Outlet />
                </div>
            </main>
        </>
    );
}