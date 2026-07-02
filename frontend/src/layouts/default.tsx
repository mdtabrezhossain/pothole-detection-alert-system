import { useEffect } from "react";
import { Outlet } from "react-router";
import Topbar from "@/components/topbar";
import BaseLayout from "@/layouts/base";
import VotingCard from "@/components/vote-card";
import { useVoteCard } from "@/contexts/vote-card";
import ImageCard from "@/components/image-card";
import { useImageCard } from "@/contexts/image-card";
import { useUser } from "@/contexts/user";


export default function DefaultLayout() {
    const { isOpen } = useVoteCard();
    const { isOpen: isImageCardOpen } = useImageCard();

    const isLoggedIn = localStorage.getItem('login');
    const userId = localStorage.getItem('userid');
    const userName = localStorage.getItem('username');

    const { setIsLoggedIn, handleSetUserId, handleSetUserName } = useUser();

    useEffect(() => {
        if (isLoggedIn
            && userId
            && userName) {
            setIsLoggedIn(true);
            handleSetUserId(userId);
            handleSetUserName(userName);
        }
    }, [isLoggedIn, userId, userName]);

    return (
        <>
            <BaseLayout />
            <main className="h-svh p-3">
                <Topbar />
                {isOpen && <VotingCard />}
                {isImageCardOpen && <ImageCard />}
                <div className="h-full w-full rounded-sm bg-secondary text-secondary-foreground shadow-2xl">
                    <Outlet />
                </div>
            </main>
        </>
    );
}