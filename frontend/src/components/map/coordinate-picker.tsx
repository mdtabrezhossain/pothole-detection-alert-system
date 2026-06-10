import { useEffect, useState } from "react";
import { useMap } from "@/components/ui/map";
import type maplibregl from "maplibre-gl";

interface Coords {
    lat: number;
    lng: number;
}

export default function MapCoordinatePicker({ lat, lng }: Coords) {
    const { map } = useMap();
    const [coords, setCoords] = useState<Coords>({ lat, lng });

    useEffect(() => {
        if (!map) return;

        function handleClick(e: maplibregl.MapMouseEvent) {
            setCoords({
                lat: parseFloat(e.lngLat.lat.toFixed(6)),
                lng: parseFloat(e.lngLat.lng.toFixed(6)),
            });
        }

        map.on("click", handleClick);

        return () => {
            map.off("click", handleClick);
        };
    }, [map]);

    if (!coords) return null;

    return (
        <div className="absolute bottom-4 left-4 z-10 rounded-md bg-background/90 border px-3 py-2 text-sm shadow-md pointer-events-none">
            <span className="text-muted-foreground">Lat:</span>{" "}
            <span className="font-mono">{coords.lat}</span>
            <br />
            <span className="text-muted-foreground">Lng:</span>{" "}
            <span className="font-mono">{coords.lng}</span>
        </div>
    );
}