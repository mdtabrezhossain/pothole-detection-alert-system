import MyMap from "@/components/map/kolkata-map";
import { useTopBar } from "@/contexts/topbar";
import { routeLocations } from "@/data/pothole";
import { getAlerts } from "@/services/potholes";
import { Pothole } from "@/types/potholes";
import { useEffect, useRef, useState } from "react";

export default function GoPage() {
    const { writeMessage, open } = useTopBar();

    const [mapState, setMapState] = useState<{
        potholes: Pothole[];
        userLocation: { lat: number; lng: number };
    }>();

    const wasAlerted = useRef(false);

    function speakAlert(text: string) {
        if (!("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find((v) => v.lang.startsWith("en"));

        if (englishVoice) utterance.voice = englishVoice;

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
    };

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

                const { potholes } = response.data;

                if (potholes.length > 0 && !wasAlerted.current) {
                    speakAlert("Warning. Pothole ahead. Please slow down");
                    wasAlerted.current = true;
                }

                if (potholes.length === 0) wasAlerted.current = false;

                setMapState({
                    potholes,
                    userLocation: { lat, lng },
                });

                await new Promise<void>((resolve) => {
                    const id = setTimeout(resolve, 1000);

                    if (cancelled) clearTimeout(id);
                });
            }
        }

        simulateMovement();

        return () => {
            cancelled = true;
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <MyMap
            potholes={mapState?.potholes}
            showRoute={true}
            userLocation={mapState?.userLocation}
        />
    );
}