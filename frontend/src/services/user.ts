import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";

interface createVoteParams {
    id: string,
    name: string,
    password: string,
}

interface LoginUserParams {
    id: string,
    password: string,
}

export async function createUser(params: createVoteParams) {
    const { id,
        name,
        password,
    } = params;

    const user = { id, name, password };

    const requestOptions: RequestOptions = {
        endpoint: `/users/signup`,
        method: "POST",
        addCookies: true,
        dataToSend: { user }
    };

    return await makeRequest(requestOptions);
}


export async function LoginUser(params: LoginUserParams) {
    const { id, password } = params;

    const user = { id, password };

    const requestOptions: RequestOptions = {
        endpoint: `/users/login`,
        method: "POST",
        addCookies: true,
        dataToSend: { user }
    };

    return await makeRequest(requestOptions);
}