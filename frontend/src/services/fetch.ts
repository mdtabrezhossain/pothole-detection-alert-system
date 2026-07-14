import { RequestOptions } from "@/types/api";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function makeRequest({ endpoint, method = "GET", addCookies = false, dataToSend }: RequestOptions) {
    const url = `${backendUrl}${endpoint}`;

    const response = await fetch(url, {
        method,
        credentials: addCookies ? "include" : undefined,
        headers: dataToSend ? { "Content-Type": "application/json" } : undefined,
        body: dataToSend ? JSON.stringify(dataToSend) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        return { data, error: true };
    }

    return { data, error: false };
}