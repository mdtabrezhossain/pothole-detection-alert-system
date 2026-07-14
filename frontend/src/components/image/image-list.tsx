import { useImageCard } from "@/contexts/image-card";
import { useState } from "react";

interface Props {
    images: Record<string, any>[];
}

export default function ImageList({ images }: Props) {
    const imagesPerRow = 3;
    const totalRows = Math.ceil(images.length / imagesPerRow);

    const rowHeight = 200;
    const totalHeight = totalRows * rowHeight;

    const visibleRowCount = 3;
    const overscanCount = 2;

    const [visibleRowRange, setVisibleRowRange] = useState({
        start: 0,
        end: visibleRowCount + overscanCount,
    });

    const imageStartIdx = visibleRowRange.start * imagesPerRow;
    const imageEndIdx = Math.min(
        visibleRowRange.end * imagesPerRow,
        images.length);
    const visibleImages = images.slice(imageStartIdx, imageEndIdx);

    const rows = [];

    for (let i = 0; i < visibleImages.length; i += imagesPerRow) {
        const rowImages = visibleImages.slice(i, i + imagesPerRow);
        rows.push(rowImages);
    }

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        const { scrollTop } = e.currentTarget;

        const start = Math.max(
            Math.floor(scrollTop / rowHeight) - overscanCount,
            0
        );
        const end = Math.min(
            start + visibleRowCount + 2 * overscanCount,
            totalRows
        );

        setVisibleRowRange({ start, end });
    }

    const { handleSetImageSrc, open } = useImageCard();

    function showImageCard(src: string) {
        handleSetImageSrc(src);
        open(true);
    }

    return (
        <div className="w-full h-full overflow-auto" onScroll={handleScroll}>
            <div style={{ height: `${totalHeight}px`, position: "relative" }}>
                <div style={{ transform: `translateY(${visibleRowRange.start * rowHeight}px)` }}>
                    {rows.map((row, i) => (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-4 p-4" key={i}
                        >
                            {row.map((image, j) => (
                                <img className="w-75 h-50 object-cover rounded"
                                    src={image.src}
                                    loading="lazy"
                                    key={j}
                                    onClick={() => showImageCard(image.src)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}