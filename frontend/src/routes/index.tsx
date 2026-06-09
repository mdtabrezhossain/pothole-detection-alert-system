import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts";
import { getNearby } from "@/services/potholes";
import Loading from "@/components/loading";



const PotholePage = lazy(() => import("@/pages/pothole"));
const UserPage = lazy(() => import("@/pages/user"));

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            { index: true, Component: PotholePage, loader: getNearby },
            { path: "user", Component: UserPage },
        ],
        HydrateFallback: Loading
    },
    {
        path: '*',
        Component: Loading
    }
]);

export default router;