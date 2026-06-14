import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";
import { ImageKitToken } from "@/types/images";
import { upload } from "@imagekit/react";

export async function getImageUploadToken() {
    const requestOptions: RequestOptions = { endpoint: '/images/upload' };
    return await makeRequest(requestOptions);
}

export async function uploadImage(file: File, imageKitToken: ImageKitToken) {
    const { signature, expire, token, public_key: publicKey } = imageKitToken;

    try {
        const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: `pothole-${Date.now()}-username`
        });

        const { fileId, url } = uploadResponse;

        if (fileId && url) {
            const response = await getImageVerification(fileId, url);
            return response;
        }

    } catch (error) {
        console.error(`Error while uploading image\n${error}`);
    }
}

export async function getImageVerification(id: string, url: string) {
    const requestOptions: RequestOptions = {
        endpoint: '/images/verify',
        method: "POST",
        dataToSend: { id, url }
    };

    return await makeRequest(requestOptions);
}