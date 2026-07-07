import { usePothole } from "@/contexts/pothole";
import { useTopBar } from "@/contexts/topbar";
import { useVoteCard } from "@/contexts/vote-card";
import { createVote } from "@/services/votes";
import { IconArrowBigUp, IconArrowBigDown } from "@tabler/icons-react";
import { useState } from "react";


export default function VotingCard() {
    const [voteType, setVoteType] = useState<"up" | "down" | null>(null);
    const [severityRating, setSeverityRating] = useState<"low" | "medium" | "high" | null>(null);
    const { potholeId } = usePothole();

    const { open } = useVoteCard();
    const { open: openTopbar, writeMessage } = useTopBar();

    const isValid =
        potholeId !== null &&
        (voteType === "down" || (voteType === "up" && severityRating));

    async function handleSubmit() {
        if (!isValid) return;

        const response = await createVote({ voteType, severityRating, potholeId });

        if (response.error) {
            writeMessage(response.data.details);
            openTopbar(true);
            return;
        }

        writeMessage(response.data.message);
        openTopbar(true);
        open(false);
    }

    return (
        <div className={`p-6 w-100 bg-card text-card-foreground rounded-md shadow-lg
            transition-all text-sm`}>
            <p className="text-lg font-semibold mb-4">Vote</p>

            <div className="flex gap-4 mb-6 justify-between">
                <button
                    onClick={() => setVoteType("up")}
                    className={`flex justify-center items-center gap-2 w-1/2 px-4 py-2 rounded-md border-2 transition-colors duration-200
                        ${voteType === "up"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-secondary hover:bg-accent hover:text-accent-foreground"
                        }`}
                >
                    <IconArrowBigUp size={16} />
                    <span>Up</span>
                </button>

                <button
                    onClick={() => setVoteType("down")}
                    className={`flex justify-center items-center gap-2 w-1/2 px-4 py-2 rounded-md border-2 transition-colors duration-200
                        ${voteType === "down"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-secondary hover:bg-accent hover:text-accent-foreground"
                        }`}
                >
                    <IconArrowBigDown size={16} />
                    <span>Down</span>
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out
                ${voteType === "up" ? "max-h-40 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"}`}
            >
                <p className="mb-2 font-medium">Severity rating:</p>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                        <input
                            required
                            className="accent-black"
                            type="radio"
                            name="severity"
                            value="high"
                            onChange={(e) => setSeverityRating(e.target.value as "high" | "medium" | "low")}
                        />
                        High
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            className="accent-black"
                            type="radio"
                            name="severity"
                            value="medium"
                            onChange={(e) => setSeverityRating(e.target.value as "high" | "medium" | "low")}
                        />
                        Medium
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            className="accent-black"
                            type="radio"
                            name="severity"
                            value="low"
                            onChange={(e) => setSeverityRating(e.target.value as "high" | "medium" | "low")}
                        />
                        Low
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={() => open(false)}
                    className="px-4 py-1 rounded-md border-2 border-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Cancel
                </button>
                <button
                    disabled={!isValid}
                    onClick={handleSubmit}
                    className={`px-4 py-1 rounded-md bg-primary text-primary-foreground border-primary
                        ${!isValid ? 'opacity-50' : ''}`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
