import { Pothole } from "@/types/potholes";
import { MarkerPopup } from "../ui/map";
import { useVoteCard } from "@/contexts/vote-card";

interface Props {
    pothole: Pothole
}

export default function PotholeDetailsPopup({ pothole }: Props) {
    const keysToShow = ["distance", "severity", "status", "uploaded_by"];
    const valueUnits: Record<string, string> = { distance: "meters" };
    const { handleSetPotholeId, open } = useVoteCard();

    function showVoteCard() {
        handleSetPotholeId(pothole.id);
        open(true);
    }

    return (
        <>
            <MarkerPopup >
                <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] place-items-center gap-1">
                    <img className="w-100 h-25 object-cover rounded" src="/images/1.jpg" loading="lazy" />
                    <img className="w-100 h-25 object-cover rounded" src="/images/4.jpg" loading="lazy" />

                    {/* <img className="w-100 h-25 object-cover rounded" src="/images/5.jpg" loading="lazy"/> */}
                    {/* <img className="w-100 h-25 object-cover rounded" src="/images/8.jpg" loading="lazy"/> */}
                </div>
                <p className="mt-2 mr-1 text-blue-500 cursor-pointer text-end">See more</p>

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