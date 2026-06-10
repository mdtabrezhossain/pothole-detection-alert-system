import MyMap from "@/components/map/kolkata-map";
import { useLoaderData } from "react-router";

export default function PotholePage() {
    const potholes = useLoaderData();

    return (
        <>
            <MyMap potholes={potholes} />
        </>
    );
}