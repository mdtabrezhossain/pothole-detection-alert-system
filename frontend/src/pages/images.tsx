import ImageList from "@/components/image/image-list";

export default function ImagesPage() {
    const images = [
        { src: 'https://ik.imagekit.io/le4nnng4wh/scooter%20rider.jpg' },
        { src: 'https://ik.imagekit.io/le4nnng4wh/petroluem%20truck.jpg' },
        { src: 'https://ik.imagekit.io/le4nnng4wh/traffic.jpg' },
        { src: 'https://ik.imagekit.io/le4nnng4wh/omni%20driver.jpg' },
        { src: 'https://ik.imagekit.io/le4nnng4wh/school%20bus.jpg' },
    ]

    return <ImageList images={images} />
}