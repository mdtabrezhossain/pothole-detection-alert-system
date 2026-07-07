import { usePothole } from "@/contexts/pothole";
import { useTopBar } from "@/contexts/topbar";
import { useVoteCard } from "@/contexts/vote-card";
import { changePothole } from "@/services/potholes";
import { useRef, useState } from "react";

interface Props {
    showPotholeIdInput?: boolean
}

export default function PotholeUpdateCard({ showPotholeIdInput = false }: Props) {
    const { potholeId, handleSetPotholeId } = usePothole();

    const potholeIdInputRef = useRef<HTMLInputElement>(null);
    const [potholeIdInputValue, setPotholeIdInputValue] = useState('');

    const [status, setStatus] = useState<"active" | "fixed" | null>(null);
    const [severityRating, setSeverityRating] = useState<"low" | "medium" | "high" | null>(null);

    const { open } = useVoteCard();
    const { open: openTopbar, writeMessage } = useTopBar();

    async function handleCancel() {
        open(false);
        handleSetPotholeId(null);
    }

    async function handleSubmit() {
        let id: number | null;

        if (showPotholeIdInput) {
            const parsedId = Number(potholeIdInputValue);

            if (Number.isNaN(parsedId)) return;

            id = parsedId;
        } else {
            id = potholeId;
        }

        if (!id) return;

        const response = await changePothole(
            id,
            status ?? undefined,
            severityRating ?? undefined
        );

        if (response.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage(response.data.message);
            open(false);
        }

        openTopbar(true);
    }

    return (
        <div className={`space-y-5 p-6 min-w-70 bg-card text-card-foreground rounded-md shadow-lg
            transition-all text-sm`}>
            <p className="text-lg font-semibold mb-4">Update Pothole</p>
            {
                showPotholeIdInput
                && <input
                    ref={potholeIdInputRef}
                    type="text"
                    placeholder="Enter pothole ID"
                    value={potholeIdInputValue}
                    className="w-full rounded-md border px-4 py-2 text-sm"
                    onChange={(e) => setPotholeIdInputValue(e.target.value)}
                />
            }

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

            <div className="flex justify-end gap-3">
                <button
                    onClick={handleCancel}
                    className="px-4 py-1 rounded-md border-2 border-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className={`px-4 py-1 rounded-md bg-primary text-primary-foreground border-primary`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
