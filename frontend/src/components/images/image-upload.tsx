import { useEffect, useRef, useState } from "react";
import { ImageKitToken } from "@/types/images";
import { IconCamera } from "@tabler/icons-react";
import { uploadImage } from "@/services/images";
import { useTopBar } from "@/contexts/topbar";

interface Props {
    imageUploadToken: ImageKitToken;
}

export default function TakePhoto({ imageUploadToken }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isBlinking, setIsBlinking] = useState<boolean>(false);
    const { writeMessage, open } = useTopBar();

    async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;

        setIsUploading(true);
        const response = await uploadImage(image, imageUploadToken);
        setIsUploading(false);

        if (response?.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage(response?.data.message);
        }

        open(true);
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
    }, [isUploading]);

    return (
        <>
            <div
                className={`flex items-center justify-center w-full h-full transition-colors
                    ${isBlinking
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'}`
                }
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".png, .jpg, .jpeg"
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