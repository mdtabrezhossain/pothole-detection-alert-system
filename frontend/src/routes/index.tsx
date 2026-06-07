import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts";



const PotholePage = lazy(() => import("@/pages/pothole"));
const UserPage = lazy(() => import("@/pages/user"));

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            { index: true, Component: PotholePage },
            { path: "user", Component: UserPage },
        ],
    },
    {
        path: '*',
        element: <div>Not Found</div>
    }
]);

export default router;