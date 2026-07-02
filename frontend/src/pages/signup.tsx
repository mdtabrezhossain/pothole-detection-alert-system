import { useTopBar } from "@/contexts/topbar";
import { useUser } from "@/contexts/user";
import { createUser } from "@/services/user";
import { SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function SignupPage() {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { writeMessage, open } = useTopBar();
    const navigate = useNavigate();

    const { setIsLoggedIn,
        handleSetUserId,
        handleSetUserName } = useUser();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await createUser({
            id: userId,
            name: userName,
            password
        });

        if (response.error) {
            writeMessage(response.data.details);
        } else {
            const { id, name } = response.data.user;

            writeMessage("Signup successfull");

            localStorage.removeItem('login');
            localStorage.removeItem('userid');
            localStorage.removeItem('username');

            localStorage.setItem('login', 'true');
            localStorage.setItem('userid', `${id}`);
            localStorage.setItem('username', `${name}`);

            setIsLoggedIn(true);
            handleSetUserId(`${id}`);
            handleSetUserName(`${name}`);

            navigate('/');
        }

        open(true);
    };

    return (
        <div className="h-full w-full flex justify-center items-center p-4">
            <div className="w-full max-w-md rounded-md bg-white text-black p-8 shadow-sm">
                <p className="mb-4  text-center text-2xl font-semibold">
                    Welcome
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium" htmlFor="userid">
                            <span>Userid</span>
                        </label>

                        <input className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                            id="userid"
                            type="text"
                            placeholder="Enter your user id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            minLength={5}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium" htmlFor="username">
                            <span>Username</span>
                        </label>

                        <input className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                            id="userid"
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            minLength={5}
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
                            minLength={10}
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