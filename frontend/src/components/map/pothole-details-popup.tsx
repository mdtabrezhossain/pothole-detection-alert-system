import { Pothole } from "@/types/potholes";
import { MarkerPopup } from "../ui/map";
import { useVoteCard } from "@/contexts/vote-card";
import { useImageCard } from "@/contexts/image-card";
import { useNavigate } from "react-router";


interface Props {
    pothole: Pothole
}

export default function PotholeDetailsPopup({ pothole }: Props) {
    const keysToShow = ["distance", "severity", "status", "uploaded_by"];
    const valueUnits: Record<string, string> = { distance: "meters" };
    const { handleSetPotholeId, open } = useVoteCard();
    const { handleSetImageSrc, open: openImageCard } = useImageCard();
    const navigate = useNavigate();

    function showVoteCard() {
        handleSetPotholeId(pothole.id);
        open(true);
    }

    function showImageCard(src: string) {
        handleSetImageSrc(src);
        openImageCard(true);
    }

    return (
        <>
            <MarkerPopup >
                <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] place-items-center gap-1">
                    <img className="w-100 h-25 object-cover rounded" src="/images/1.jpg"
                        loading="lazy"
                        onClick={() => showImageCard("/images/1.jpg")} />
                    <img className="w-100 h-25 object-cover rounded" src="/images/4.jpg"
                        loading="lazy"
                        onClick={() => showImageCard("/images/4.jpg")} />
                </div>
                <button className="flex justify-end mt-2 pr-1 w-full text-blue-500 cursor-pointer" onClick={() => navigate('potholes/images')}>See more</button>

                <div>
                    {Object.entries(pothole)
                        .filter(([key]) => keysToShow.includes(key))
                        .map(([key, value]) => {
                            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                            return (
                                <p key={key}>
                                    {capitalizedKey}: {value} {valueUnits[key]}
                                </p>
                            );
                        })}
                </div>

                <button onClick={showVoteCard}
                    className="mt-3 py-1 px-1 rounded-sm w-full bg-primary text-primary-foreground"
                >
                    Vote
                </button>

            </MarkerPopup>
        </>
    );
}