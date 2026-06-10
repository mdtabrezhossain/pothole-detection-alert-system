import { Pothole } from "@/types/potholes";
import { MarkerPopup } from "../ui/map";

interface Props {
    pothole: Pothole
}

export default function PotholeDetailsPopup({ pothole }: Props) {
    return (
        <>
            <MarkerPopup>
                <div >
                    {Object.entries(pothole).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                </div>
            </MarkerPopup>
        </>
    );
}