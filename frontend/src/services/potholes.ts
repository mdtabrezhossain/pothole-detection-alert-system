const url = import.meta.env.VITE_BACKEND_URL;
const latitude = 22.551512;
const longitude = 88.353779;

export async function getNearby() {
    try {
        const response = await fetch(`${url}/potholes/?lat=${latitude}&lng=${longitude}`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            console.error(response);
            throw new Response("Failed to fetch nearby potholes");
        }

        return response.json();
    } catch (error) {
        throw new Response("Something went wrong while fetching nearby potholes",);
    }
}

