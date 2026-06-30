import { useTopBar } from "@/contexts/topbar";
import { useUser } from "@/contexts/user";
import { LoginUser } from "@/services/user";
import { SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const { writeMessage, open } = useTopBar();
    const navigate = useNavigate();

    const { setIsLoggedIn, handleSetUserId } = useUser();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await LoginUser({
            id: userId,
            password
        });

        if (response.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage("Logged in successfully");

            localStorage.removeItem('login');
            localStorage.removeItem('userid');

            localStorage.setItem('login', 'true');
            localStorage.setItem('userid', `${response.data.user.id}`);

            setIsLoggedIn(true);
            handleSetUserId(`${response.data.user.id}`);

            navigate('/');
        }

        open(true);
    };

    return (
        <div className="h-full w-full flex justify-center items-center p-4">
            <div className="w-full max-w-md rounded-md bg-white text-black p-8 shadow-sm">
                <p className="mb-4  text-center text-2xl font-semibold">
                    Welcome Back
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium" htmlFor="userid">
                            <span>Userid</span>
                        </label>

                        <input className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                            id="userid"
                            type="text"
                            placeholder="Enter your user-id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium" htmlFor="password">
                            Password
                        </label>

                        <input className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="h-11 w-full rounded-md bg-black text-sm font-medium text-white transition-colors hover:bg-muted-foreground active:scale-[0.95]" type="submit"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}