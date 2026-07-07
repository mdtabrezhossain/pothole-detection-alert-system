import ImageList from "@/components/images/image-list";

export default function TestPage() {
    const images = [
        { src: '/images/1.jpg' },
        { src: '/images/2.jpg' },
        { src: '/images/4.jpg' },
        { src: '/images/5.jpg' },
        { src: '/images/8.jpg' },
        { src: '/images/1.jpg' },
        { src: '/images/2.jpg' },
        { src: '/images/4.jpg' },
    ]

    return <ImageList images={images} />
}