import { Outlet } from "react-router";
import Topbar from "@/components/topbar";
import BaseLayout from "@/layouts/base";
import VotingCard from "@/components/vote-card";
import { useVoteCard } from "@/contexts/vote-card";
import ImageCard from "@/components/image-card";
import { useImageCard } from "@/contexts/image-card";


export default function DefaultLayout() {
    const { isOpen } = useVoteCard();
    const { isOpen: isImageCardOpen } = useImageCard();

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