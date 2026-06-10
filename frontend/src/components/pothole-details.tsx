import { MapPopup } from "./ui/map";
import { Pothole } from "@/types/potholes";


export default function PotholeDetails() {
    return (<MapPopup latitude={22.550750} longitude={88.354248}>
        <div className="mt-2 space-y-1 text-sm">
            <p>
                <strong>Severity:</strong>{" "}
                high
            </p>

            <p>
                <strong>Status:</strong>{" "}
                active
            </p>

            <p>
                <strong>Uploaded By:</strong>{" "}
                leon
            </p>

            <p>
                <strong>Distance:</strong>{" "}
                {100} m
            </p>
        </div>
    </MapPopup>);
}