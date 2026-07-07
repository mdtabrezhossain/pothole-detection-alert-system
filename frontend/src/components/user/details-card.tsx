import { useTopBar } from "@/contexts/topbar";
import { useUser } from "@/contexts/user";
import { logoutUser, updateUser } from "@/services/user";
import { IconLockPassword, IconLogout, IconPencil } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function UserDetailsCard() {
    const {
        userId,
        userName,
        setIsLoggedIn,
        handleSetUserId,
        handleSetUserName
    } = useUser();

    const [editProfile, setEditProfile] = useState(false);
    const [userIdInput, setUserIdInput] = useState(userId ?? '');
    const [userNameInput, setUserNameInput] = useState(userName ?? '');

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const { writeMessage, open } = useTopBar();
    const navigate = useNavigate();

    async function logout() {
        const response = await logoutUser();

        if (response.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage(response.data.message);

            localStorage.removeItem('login');
            localStorage.removeItem('userid');
            localStorage.removeItem('username');

            setIsLoggedIn(false);
            handleSetUserId(null);
            handleSetUserName(null);
        }

        open(true);
        navigate('/');
    }

    async function saveDetails() {
        const user = {
            id: userIdInput,
            name: userNameInput,
            password: passwordInputRef.current?.value ?? ''
        };

        const response = await updateUser(user);

        if (response.error) {
            writeMessage(response.data.details);
        } else {
            writeMessage("Success");

            const { id, name } = response.data.user;

            setEditProfile(false);
            handleSetUserId(`${id}`);
            handleSetUserName(`${name}`);

            localStorage.removeItem('userid');
            localStorage.removeItem('username');

            localStorage.setItem('userid', `${id}`);
            localStorage.setItem('username', `${name}`);
        }

        open(true);
    }

    function handleCancel() {
        setEditProfile(false);
        setUserIdInput(userId ?? '');
        setUserNameInput(userName ?? '');
    }

    return (
        <>
            <div className="flex flex-col justify-center items-end gap-4 p-4 rounded-md border bg-card text-secondary-foreground">
                {
                    editProfile ? (
                        <>
                            <div className="flex gap-4 items-center">
                                <input
                                    className="h-11 w-full rounded-md border p-8 text-3xl font-bold outline-none transition-all focus:ring"
                                    type="text"
                                    value={userNameInput ?? ''}
                                    onChange={(e) => setUserNameInput(e.target.value)}
                                />
                                <IconPencil size={16} />
                            </div>


                            <div className="flex gap-4 items-center">
                                <input
                                    className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                                    type="text"
                                    value={userIdInput ?? ''}
                                    onChange={(e) => setUserIdInput(e.target.value)}
                                />

                                <IconPencil size={16} />
                            </div>

                            <div className="flex gap-4 items-center">
                                <input
                                    ref={passwordInputRef}
                                    className="h-11 w-full rounded-md border px-3 text-sm outline-none transition-all focus:ring"
                                    type="password"
                                    placeholder="Enter your password"
                                />

                                <IconLockPassword size={16} />
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold">{userName}</h1>
                            <p className="text-muted-foreground">{userId}</p>
                        </>
                    )
                }

                <div className="flex items-center justify-end gap-4 w-full max-sm:flex-col">
                    {
                        editProfile ? (
                            <>
                                <button className="flex gap-2 justify-center items-center px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer max-sm:w-full"
                                >
                                    <p onClick={saveDetails}>Save</p>
                                </button>

                                <button className="flex gap-2 justify-center items-center px-3 py-1 rounded-md bg-secondary border-secondary text-secondary-foreground text-sm cursor-pointer max-sm:w-full"
                                >
                                    <p onClick={handleCancel}>Cancel</p>
                                </button>
                            </>
                        ) : <></>
                    }

                    <button className="flex gap-2 justify-center items-center px-3 py-1 rounded-md bg-secondary border-secondary text-secondary-foreground text-sm cursor-pointer max-sm:w-full"
                        onClick={() => setEditProfile(true)}
                    >
                        <p>Edit Profile</p>
                        <IconPencil size={16} />
                    </button>
                    <button className="flex gap-2 justify-center items-center px-3 py-1 rounded-md bg-secondary border-secondary text-secondary-foreground text-sm cursor-pointer max-sm:w-full"
                        onClick={logout}
                    >
                        <p>Logout</p>
                        <IconLogout size={16} />
                    </button>
                </div>
            </div>
        </>
    );
}