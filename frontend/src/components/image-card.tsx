import { useImageCard } from "@/contexts/image-card";
import { useEffect, useRef } from "react";

export default function ImageCard() {
    const { imageSrc, open, handleSetImageSrc } = useImageCard();
    const cardRef = useRef<HTMLDivElement | null>(null);

    function closeImageCard() {
        handleSetImageSrc('');
        open(false);
    }

    useEffect(() => {
        if (cardRef.current) {
            const card = cardRef.current;

            card.addEventListener('dblclick', closeImageCard);

            return () => card.removeEventListener('dblclick', closeImageCard);
        }
    }, [])

    return (
        <>
            <div className="absolute top-0 left-0 z-30 flex flex-col gap-4 w-screen h-svh bg-black/50 text-white overflow-y-scroll p-4"
                ref={cardRef}>
                <span className="text-center">Double tap anywhere to close</span>
                <img className='rounded-md' src={imageSrc ?? ''} />
            </div >
        </>
    );
}