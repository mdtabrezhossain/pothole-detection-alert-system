import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import DefaultLayout from '@/layouts/default'
import Loading from "@/components/loading";
import ErrorPage from "@/pages/error";
import { getImageUploadToken } from "@/services/images";
import { getNearby } from "@/services/potholes";


const NearbyPotholesPage = lazy(() => import("@/pages/nearby-potholes"));
const AddPotholePage = lazy(() => import("@/pages/add-pothole"));
const GoPage = lazy(() => import("@/pages/go"));
const TestPage = lazy(() => import("@/pages/images-page"));
const UserPage = lazy(() => import("@/pages/user"));

const router = createBrowserRouter([
    {
        Component: DefaultLayout,
        children: [
            { index: true, Component: NearbyPotholesPage, loader: getNearby },
            { path: "/potholes/add", Component: AddPotholePage, loader: getImageUploadToken },
            { path: "potholes/alerts", Component: GoPage },
            { path: "/potholes/add", Component: AddPotholePage },
            { path: "/user", Component: UserPage },
            { path: "/potholes/images", Component: TestPage },
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