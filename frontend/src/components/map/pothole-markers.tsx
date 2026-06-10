import { useState } from "react";
import { MapMarker, MarkerContent } from "@/components/ui/map";
import { Pothole } from "@/types/potholes";
import { IconCircleFilled } from "@tabler/icons-react";
import PotholeDetailsPopup from "./pothole-details-popup";

interface Props {
    potholes?: Pothole[];
}

const severityColors: Record<string, string> = {
    low: "yellow",
    medium: "orange",
    high: "red",
};

export default function PotholeMarkers({ potholes }: Props) {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <>
            {potholes?.map((pothole) => (
                <MapMarker
                    key={pothole.id}
                    latitude={Number(pothole.latitude)}
                    longitude={Number(pothole.longitude)}
                >
                    <MarkerContent>
                        <IconCircleFilled
                            className="cursor-pointer"
                            size={20}
                            color={
                                pothole.status === "fixed"
                                    ? "lime"
                                    : severityColors[pothole.severity]
                            }
                            onClick={() =>
                                setOpenId(openId === pothole.id ? null : pothole.id)
                            }
                        />
                        {openId === pothole.id && (
                            <PotholeDetailsPopup pothole={pothole} />
                        )}
                    </MarkerContent>
                </MapMarker>
            ))}
        </>
    );
}
