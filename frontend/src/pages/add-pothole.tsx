import TakePhoto from "@/components/image-upload";
import { ImageKitToken } from "@/types/images";
import { useLoaderData } from "react-router";

export default function AddPotholePage() {
    const imageUploadToken: ImageKitToken = useLoaderData();

    return (
        <>
            <TakePhoto imageUploadToken={imageUploadToken} />
        </>
    );
}