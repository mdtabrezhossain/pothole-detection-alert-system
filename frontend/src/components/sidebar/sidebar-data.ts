import { IconLogin, IconMapPin, IconMapPlus, IconRoad, IconUserPlus } from "@tabler/icons-react";

import { ComponentType } from "react";

export interface SidebarOption {
    title: string;
    path: string;
    icon?: ComponentType<{ size?: number }>;
    subOptions?: SidebarOption[];
}

const data: SidebarOption[] = [
    {
        title: 'Pothole',
        path: '#',
        subOptions: [
            {
                title: 'See nearby',
                path: '#',
                icon: IconMapPin
            },
            {
                title: 'Add new',
                path: '/potholes/new',
                icon: IconMapPlus
            },
            {
                title: 'Go',
                path: '/potholes/alerts',
                icon: IconRoad
            },
        ],
    },
    {
        title: 'User',
        path: '#',
        subOptions: [
            {
                title: 'Signup',
                path: '/users/signup',
                icon: IconUserPlus
            },
            {
                title: 'Login',
                path: '/users/login',
                icon: IconLogin
            },
        ],
    },
];

export default data;