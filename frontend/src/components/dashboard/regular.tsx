import UserDetailsCard from "@/components/user/details-card";
import { IconMapPin } from "@tabler/icons-react";


interface Pothole {
    status: 'Active' | 'Fixed';
    image_url: string;
    location: string;
    reported_on: string;
};

const potholes: Pothole[]
    = [
        {
            status: 'Active',
            image_url: "/images/1.jpg",
            location: 'Camac Street',
            reported_on: '3 Jul 2026'
        },
        {
            status: 'Active',
            image_url: "/images/2.jpg",
            location: 'Robinson Street',
            reported_on: '15 June 2026'
        },
        {
            status: 'Fixed',
            image_url: "/images/4.jpg",
            location: 'Elliot Road',
            reported_on: '7 June 2026'
        },
        {
            status: 'Active',
            image_url: "/images/5.jpg",
            location: 'Park Lane',
            reported_on: '28 May 2026'
        },
        {
            status: 'Active',
            image_url: "/images/8.jpg",
            location: 'Shakespeare Sarani',
            reported_on: '21 May 2026'
        }
    ];

const statusColor = {
    Active: "bg-red-100 text-red-600",
    Fixed: "bg-green-100 text-green-700"
};

export default function RegularDashboard() {
    return (
        <>
            <div className="space-y-6">
                <UserDetailsCard />

                <div>
                    <p className="mb-4 text-2xl font-semibold">
                        Potholes Reported
                    </p>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {potholes.map((pothole) => (
                            <div
                                key={pothole.image_url}
                                className="overflow-hidden rounded-lg border bg-card"
                            >
                                <img
                                    src={pothole.image_url}
                                    className="h-50 w-full object-cover"
                                />

                                <div className="p-4">
                                    <div className="mb-4">
                                        <span className={` rounded-full px-3 py-1 text-xs font-medium ${statusColor[pothole.status]}`}>
                                            {pothole.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 text-sm">
                                        <div className="flex gap-2">
                                            <IconMapPin color="red" size={20} />
                                            <span>
                                                {pothole.location}
                                            </span>
                                        </div>
                                        <p className="text-sm"> Reported on {pothole.reported_on}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}