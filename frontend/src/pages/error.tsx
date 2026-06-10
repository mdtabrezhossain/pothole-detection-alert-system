import { useNavigate } from "react-router";

export default function ErrorPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3 h-screen w-screen bg-background text-foreground light">
                <p className="text-3xl font-bold">Oops!</p>
                <p>Something went wrong on our side</p>
                <button
                    className="py-2 px-6 rounded-md bg-primary text-sm text-primary-foreground cursor-pointer"
                    onClick={goBack}>Go Back</button>
            </div>
        </>
    );
}