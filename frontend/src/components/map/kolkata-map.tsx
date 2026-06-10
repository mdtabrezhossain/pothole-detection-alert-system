import { Map, MapControls } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme";
import MapCoordinatePicker from "./coordinate-picker";
import PotholeMarkers from "./pothole-markers";
import { Pothole } from "@/types/potholes";


interface Props {
    potholes?: Pothole[]
}

export default function MyMap({ potholes }: Props) {
    const centerLat = 22.572087;
    const centerLng = 88.364187;
    const southWestCornerLat = 22.53;
    const southWestCornerLng = 88.28;
    const northEastCornerLng = 88.46;
    const northEastCornerLat = 22.61;
    const { theme } = useTheme();

    return (
        <Card className="h-screen w-screen p-0 overflow-hidden">
            <Map
                theme={theme}
                className="h-full w-full"
                center={[centerLng, centerLat]}
                maxBounds={[
                    [southWestCornerLng, southWestCornerLat],
                    [northEastCornerLng, northEastCornerLat]
                ]}
            >
                <MapControls showFullscreen={true} />

                <MapCoordinatePicker lat={centerLat} lng={centerLng} />

                <PotholeMarkers potholes={potholes}></PotholeMarkers>
            </Map>
        </Card>
    )
}

