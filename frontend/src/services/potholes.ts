import { RequestOptions } from "@/types/api";
import { makeRequest } from "./fetch";


export async function getNearby() {
    const latitude = 22.551512;
    const longitude = 88.353779;
    const requestOptions: RequestOptions = {
        endpoint: `/potholes/?lat=${latitude}&lng=${longitude}`,
        method: "GET",
    };

    return await makeRequest(requestOptions);
}

export async function getAlerts(latitude: number = 22.549947, longitude: number = 88.353912) {
    // const heading = await getHeading();
    const heading = 180;

    const requestOptions: RequestOptions = {
        endpoint: `/potholes/alerts/?lat=${latitude}&lng=${longitude}&hd=${heading}`,
    };

    return makeRequest(requestOptions);
}

// function getHeading(): Promise<number | null> {
//     return new Promise((resolve) => {
//         window.addEventListener(
//             "deviceorientation",
//             (event) => resolve(event.alpha),
//             { once: true }
//         );
//     });
// }

export async function changePothole(id: number, status?: 'active' | 'fixed', severity?: 'low' | 'medium' | 'high') {
    const pothole = { id, status, severity };

    const requestOptions: RequestOptions = {
        endpoint: `/potholes/admin/${id}`,
        method: "PUT",
        addCookies: true,
        dataToSend: { pothole }
    };

    return await makeRequest(requestOptions);
}

export async function deletePothole(id: number) {
    const pothole = { id };

    const requestOptions: RequestOptions = {
        endpoint: `/potholes/${id}`,
        method: "DELETE",
        addCookies: true,
        dataToSend: { pothole }
    };

    return await makeRequest(requestOptions);
}
