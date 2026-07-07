import TakePhoto from "@/components/images/image-upload";
import { useTopBar } from "@/contexts/topbar";
import { useLoaderData } from "react-router";

export default function AddPotholePage() {
    const response = useLoaderData();
    const { writeMessage, open } = useTopBar();

    if (response.error) {
        writeMessage(response.data.details);
        open(true);
    }

    return (
        <>
            <TakePhoto imageUploadToken={response.data} />
        </>
    );
}