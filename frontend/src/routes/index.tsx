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
const ImagesPage = lazy(() => import("@/pages/images"));
const UserPage = lazy(() => import("@/pages/user"));
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const MyAccountPage = lazy(() => import("@/pages/my-account"));

const userid = localStorage.getItem('userid');

const router = createBrowserRouter([
    {
        Component: DefaultLayout,
        children: [
            { index: true, Component: NearbyPotholesPage, loader: getNearby },
            { path: "/potholes/add", Component: AddPotholePage, loader: getImageUploadToken },
            { path: "potholes/alerts", Component: GoPage },
            { path: "/user", Component: UserPage },
            { path: "/potholes/images", Component: ImagesPage },
            { path: "users/login", Component: LoginPage },
            { path: "users/signup", Component: SignupPage },
            { path: `/users/${userid}`, Component: MyAccountPage },
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