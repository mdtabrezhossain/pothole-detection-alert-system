import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import DefaultLayout from '@/layouts/default'
import Loading from "@/components/loading";
import ErrorPage from "@/pages/error";
import { getImageUploadToken } from "@/services/images";


const NearbyPotholesPage = lazy(() => import("@/pages/nearby-potholes"));
const AddPotholePage = lazy(() => import("@/pages/add-pothole"));
const UserPage = lazy(() => import("@/pages/user"));

const router = createBrowserRouter([
    {
        Component: DefaultLayout,
        children: [
            { index: true, Component: NearbyPotholesPage },
            { path: "/potholes/add", Component: AddPotholePage, loader: getImageUploadToken },
            // { path: "/potholes/add", Component: AddPotholePage },
            { path: "/user", Component: UserPage },
        ],
        HydrateFallback: Loading,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <div>page does not exists</div>,
        HydrateFallback: Loading,
        errorElement: <ErrorPage />,
    }
]);

export default router;