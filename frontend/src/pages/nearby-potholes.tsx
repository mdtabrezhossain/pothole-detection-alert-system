import MyMap from "@/components/map/kolkata-map";
import { useTopBar } from "@/contexts/topbar";
import { useLoaderData } from "react-router";

export default function NearbyPotholesPage() {
    const response = useLoaderData();
    const { writeMessage, open } = useTopBar();


    if (response.error) {
        writeMessage(response.data.details);
        open(true);
        return;
    }

    return (
        <MyMap potholes={response.data} />
    );
}