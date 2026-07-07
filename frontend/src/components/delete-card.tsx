import { useTopBar } from "@/contexts/topbar";
import { IconTrash } from "@tabler/icons-react";
import { useRef } from "react";


interface Props {
    title: string;
    inputPlaceHolder: string;
    onDeleteByNumericId?: (id: number) => Promise<any>;
    onDeleteByStringId?: (id: string) => Promise<any>;
};

export default function DeleteByIdCard({ title, inputPlaceHolder, onDeleteByNumericId, onDeleteByStringId }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { writeMessage, open } = useTopBar();

    async function handleOnDelete() {
        if (inputRef.current?.value) {
            const id = inputRef.current?.value;
            let response;

            if (onDeleteByNumericId) {
                const parsedId = Number(id);

                if (Number.isNaN(parsedId)) return;

                response = await onDeleteByNumericId(parsedId);
            }
            else if (onDeleteByStringId) {
                response = await onDeleteByStringId(id);
            }

            if (response.error) {
                writeMessage(response.data.details);
            } else {
                writeMessage(response.data.message);
                open(false);
            }

            open(true);
        }
    }

    return (
        <>
            <div className="w-full h-40 rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold"> {title} </h2>

                <div className="flex gap-4">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={inputPlaceHolder}
                        className="w-full rounded-md border px-4 py-2 text-sm"
                    />

                    <button className="rounded-md bg-destructive text-sm text-destructive-foreground px-4 py-1" onClick={handleOnDelete}>
                        <IconTrash />
                    </button>
                </div>
            </div>
        </>
    );
}
