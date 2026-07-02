import { IconLogin, IconMapPin, IconMapPlus, IconRoad, IconUserCircle, IconUserPlus } from "@tabler/icons-react";
import { ComponentType } from "react";

export interface SidebarOption {
    title: string;
    path?: string;
    icon?: ComponentType<{ size?: number }>;
    subOptions?: SidebarOption[];
}

const userid = localStorage.getItem('userid');

const data: SidebarOption[] = [
    {
        title: 'Potholes',
        subOptions: [
            {
                title: 'See nearby',
                path: '/',
                icon: IconMapPin
            },
            {
                title: 'Add new',
                path: '/potholes/add',
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
        subOptions: [
            {
                title: 'My account',
                path: `/users/${userid}`,
                icon: IconUserCircle
            },
            {
                title: 'Signup',
                path: '/users/signup',
                icon: IconUserPlus
            },
            {
                title: 'Login',
                path: '/users/login',
                icon: IconLogin
            }
        ],
    },
];

export default data;