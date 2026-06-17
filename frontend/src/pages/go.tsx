import MyMap from "@/components/map/kolkata-map";
import { useTopBar } from "@/contexts/topbar";
import { routeLocations } from "@/data/pothole";
import { getAlerts } from "@/services/potholes";
import { Pothole } from "@/types/potholes";
import { useEffect, useState } from "react";

export default function GoPage() {
    const { writeMessage, open } = useTopBar();
    const [mapState, setMapState] = useState
        <{
            potholes: Pothole[],
            userLocation: { lat: number, lng: number }
        }>();

    useEffect(() => {
        let cancelled = false;

        async function simulateMovement() {
            for (const location of routeLocations) {
                const lat = location[1];
                const lng = location[0];

                if (cancelled) break;

                const response = await getAlerts(lat, lng);

                if (response.error) {
                    writeMessage(response.data.details);
                    open(true);
                    return;
                }

                if (cancelled) break;

                setMapState({
                    potholes: response.data.potholes,
                    userLocation: { lat, lng }
                });

                await new Promise<void>(resolve => {
                    const id = setTimeout(resolve, 1000);

                    if (cancelled) clearTimeout(id);
                });
            }
        }

        simulateMovement();

        return () => { cancelled = true; };
    }, []);

    return <MyMap potholes={mapState?.potholes} showRoute={true} userLocation={mapState?.userLocation} />;
}