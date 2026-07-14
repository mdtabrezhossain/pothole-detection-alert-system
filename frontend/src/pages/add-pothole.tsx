import TakePhoto from "@/components/image/image-upload";
import { useTopBar } from "@/contexts/topbar";
import { useEffect } from "react";
import { useLoaderData } from "react-router";

export default function AddPotholePage() {
    const response = useLoaderData();
    const { writeMessage, open } = useTopBar();


    useEffect(() => {
        if (response.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage(response.data.message);
        }

        open(true);
    }, [response])

    return (
        <>
            <TakePhoto imageUploadToken={response.data} />
        </>
    );
}