import { useTopBar } from "@/contexts/topbar";
import { useVoteCard } from "@/contexts/vote-card";
import { changePothole } from "@/services/potholes";
import { useState } from "react";


export default function A() {
    const [status, setStatus] = useState<"active" | "fixed" | null>(null);
    const [severityRating, setSeverityRating] = useState<"low" | "medium" | "high" | null>(null);

    const { potholeId, open } = useVoteCard();
    const { open: openTopbar, writeMessage } = useTopBar();

    async function handleSubmit() {
        if (!potholeId) return;

        const response = await changePothole(
            potholeId,
            status ?? undefined,
            severityRating ?? undefined
        );

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
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-screen h-svh bg-black/50">
            <div className={`p-6 w-100 bg-card text-card-foreground rounded-md shadow-lg
            transition-all text-sm`}>
                <p className="text-lg font-semibold mb-4">Update</p>
                <div className="space-y-5">
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out`}>
                        <p className="mb-2 font-medium">Status:</p>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input
                                    required
                                    className="accent-black"
                                    type="radio"
                                    name="status"
                                    value="active"
                                    onChange={(e) => setStatus(e.target.value as 'fixed' | 'active')}
                                />
                                Active
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    className="accent-black"
                                    type="radio"
                                    name="status"
                                    value="fixed"
                                    onChange={(e) => setStatus(e.target.value as 'fixed' | 'active')}
                                />
                                Fixed
                            </label>
                        </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out`}                    >
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

                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => open(false)}
                        className="px-4 py-1 rounded-md border-2 border-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        // disabled={!isValid}
                        onClick={handleSubmit}
                        className={`px-4 py-1 rounded-md bg-primary text-primary-foreground border-primary
                            `}
                    >
                        {/* ${!isValid ? 'opacity-50' : ''} */}
                        Submit
                    </button>
                </div>
            </div>
        </div >
    );
}
