import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";
import { UserCredentials, UserDetails } from "@/types/user";

export async function createUser(params: UserDetails) {
    const requestOptions: RequestOptions = {
        endpoint: `/users/signup`,
        method: "POST",
        addCookies: true,
        dataToSend: { user: params }
    };

    return await makeRequest(requestOptions);
}

export async function loginUser(params: UserCredentials) {
    const requestOptions: RequestOptions = {
        endpoint: `/users/login`,
        method: "POST",
        addCookies: true,
        dataToSend: { user: params }
    };

    return await makeRequest(requestOptions);
}

export async function logoutUser() {
    const requestOptions: RequestOptions = {
        endpoint: `/users/logout`,
        method: "POST",
        addCookies: true,
        dataToSend: {}
    };

    return await makeRequest(requestOptions);
}

export async function updateUser(params: UserDetails) {
    const userid = localStorage.getItem('userid');

    const requestOptions: RequestOptions = {
        endpoint: `/users/${userid}`,
        method: "PUT",
        addCookies: true,
        dataToSend: { user: params }
    };

    return await makeRequest(requestOptions);
}

export async function adminUserDelete(id: string) {
    const user = { id };

    const requestOptions: RequestOptions = {
        endpoint: `/users/${id}`,
        method: "DELETE",
        addCookies: true,
        dataToSend: { user }
    };

    return await makeRequest(requestOptions);
}