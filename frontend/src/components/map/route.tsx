import { MapRoute } from "@/components/ui/map";
import { routeLocations } from "@/data/pothole";


export function Route() {
    return (
        <div>
            <MapRoute coordinates={routeLocations} color="#3b82f6" width={5} opacity={0.8} />
        </div>
    );
}
