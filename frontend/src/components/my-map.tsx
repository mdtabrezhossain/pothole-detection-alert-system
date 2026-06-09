import { useState, useEffect } from "react"
import { Map, MapControls, MapMarker, MarkerContent, useMap } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import type maplibregl from "maplibre-gl"
import { useTheme } from "@/contexts/theme";
import { IconCircleFilled } from "@tabler/icons-react";

interface Props {
    onCoords(coords: Coords): void;
}

interface Coords {
    lat: number;
    lng: number;
}

function ClickHandler({ onCoords }: Props) {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return

        function handleClick(e: maplibregl.MapMouseEvent) {
            onCoords({
                lat: parseFloat(e.lngLat.lat.toFixed(6)),
                lng: parseFloat(e.lngLat.lng.toFixed(6)),
            })
        }


        map.on("click", handleClick)

        return () => {
            map.off("click", handleClick)
        }
    }, [map, onCoords])

    return null
}

interface pothole {
    distance: number,
    id: number,
    latitude: string,
    longitude: string,
    severity: string,
    status: string,
    updated_at: string,
    uploaded_at: string,
    uploaded_by: string
}

interface MyMapProps {
    potholes?: pothole[]
}

export default function MyMap(props: MyMapProps) {
    const centerLat = 22.57;
    const centerLng = 88.36;
    const southWestCornerLat = 22.53;
    const southWestCornerLng = 88.28;
    const northEastCornerLng = 88.46;
    const northEastCornerLat = 22.61;
    const { potholes } = props

    const [coords, setCoords] = useState<Coords | null>({
        lat: centerLat,
        lng: centerLng,
    });
    const { theme } = useTheme();
    const potholeSeverityColors: Record<pothole["severity"], string> = {
        low: "yellow",
        medium: "orange",
        high: "red",
    }

    console.log(coords?.lat, coords?.lng);
    console.log(potholes)

    return (
        <Card className="h-full w-full p-0 overflow-hidden">
            <Map
                theme={theme}
                className="h-full w-full"
                center={[centerLng, centerLat]}
                zoom={12}
                maxBounds={[
                    [southWestCornerLng, southWestCornerLat],
                    [northEastCornerLng, northEastCornerLat]
                ]}
            >
                <MapControls showFullscreen={true} />

                <ClickHandler onCoords={setCoords} />

                {potholes?.map((pothole) => (
                    <MapMarker
                        key={pothole.id}
                        latitude={Number(pothole.latitude)}
                        longitude={Number(pothole.longitude)}
                    >
                        <MarkerContent>
                            <IconCircleFilled size={20}
                                color={potholeSeverityColors[pothole.severity]}
                            />
                        </MarkerContent>
                    </MapMarker>
                ))}
            </Map>

            {coords && (
                <div className="absolute bottom-4 left-4 z-10 rounded-md bg-background/90 border px-3 py-2 text-sm shadow-md pointer-events-none">
                    <span className="text-muted-foreground">Lat:</span>{" "}
                    <span className="font-mono">{coords.lat}</span>
                    <br />
                    <span className="text-muted-foreground">Lng:</span>{" "}
                    <span className="font-mono">{coords.lng}</span>
                </div>
            )}
        </Card>
    )
}