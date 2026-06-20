import { Map, MapControls, MapMarker, MarkerContent } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme";
import MapCoordinatePicker from "./coordinate-picker";
import PotholeMarkers from "./pothole-markers";
import { Pothole } from "@/types/potholes";
import { Route } from "./route";
import { IconHelmet } from "@tabler/icons-react";


interface Props {
    potholes?: Pothole[],
    showRoute?: boolean,
    userLocation?: { lat: number, lng: number }
}

export default function MyMap({ potholes, showRoute = false, userLocation }: Props) {
    const centerLat = 22.572087;
    const centerLng = 88.364187;
    const southWestCornerLat = 22.53;
    const southWestCornerLng = 88.28;
    const northEastCornerLng = 88.46;
    const northEastCornerLat = 22.61;
    const { theme } = useTheme();

    return (
        <Card className="h-full w-full p-0 rounded-sm overflow-hidden">
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

                <PotholeMarkers potholes={potholes} />


                {userLocation ?
                    <MapCoordinatePicker
                        lat={userLocation.lat}
                        lng={userLocation.lng}
                    />
                    : <MapCoordinatePicker
                        lat={centerLat}
                        lng={centerLng}
                    />
                }

                {userLocation &&
                    <MapMarker
                        latitude={Number(userLocation.lat)}
                        longitude={Number(userLocation.lng)}
                    >
                        <MarkerContent>
                            <div className={`rounded-full ${theme === 'dark' ? "bg-white" : "bg-black"}`}>
                                <IconHelmet color={theme === 'dark' ? "black" : "white"} />
                            </div>
                        </MarkerContent>
                    </MapMarker>
                }

                {showRoute && <Route />}
            </Map>
        </Card>
    );
}

