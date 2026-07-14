import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";
import { ImageKitToken } from "@/types/images";
import { upload } from "@imagekit/react";

export async function getImageUploadToken() {
    const requestOptions: RequestOptions = {
        endpoint: '/images/upload',
        addCookies: true
    };

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

        const { url } = uploadResponse;

        if (!url) {
            return {
                error: true,
                data: {
                    details: 'Something went wrong. Could not upload image '
                }
            }
        }

        return { data: { url } };

    } catch (error) {
        console.error(`Error while uploading image\n${error}`);
    }
}
