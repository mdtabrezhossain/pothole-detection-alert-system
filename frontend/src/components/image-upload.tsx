import { useEffect, useRef, useState } from "react";
import { upload } from "@imagekit/react";
import { ImageKitToken } from "@/types/images";
import { IconCamera } from "@tabler/icons-react";


interface Props {
    imageUploadToken: ImageKitToken;
}

export default function TakePhoto({ imageUploadToken }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isBlinking, setIsBlinking] = useState<boolean>(false);

    async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;

        setIsUploading(true);
        await uploadImage(image, imageUploadToken);
        setIsUploading(false);
    }

    useEffect(() => {
        if (!isUploading) {
            setIsBlinking(false);
            return;
        }

        const intervalId = setInterval(() => {
            setIsBlinking(prev => !prev);
        }, 300)

        return () => clearInterval(intervalId);
    });

    return (
        <>
            <div
                ref={containerRef}
                className={`flex items-center justify-center w-full h-full transition-colors
                    ${isBlinking
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'}`
                }
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpg"
                    capture="environment"
                    onChange={handleImage}
                    className="hidden"
                />
                <div className="flex flex-col justify-between items-center gap-3">
                    <IconCamera size={64} />
                    <button
                        className={`py-2 px-6 rounded-md text-sm cursor-pointer transition-colors
                            ${isBlinking
                                ? 'bg-secondary text-secondary-foreground'
                                : 'bg-primary text-primary-foreground'}`
                        }
                        onClick={() => inputRef.current?.click()}
                    >
                        Take Photo
                    </button>
                </div>
            </div >
        </>
    )
}

async function uploadImage(file: File, imageKitToken: ImageKitToken) {
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

        console.log("Upload response:", uploadResponse);

        await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
        console.error(`Error while uploading image\n${error}`);
    }
}