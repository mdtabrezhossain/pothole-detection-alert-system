const url = import.meta.env.VITE_BACKEND_URL;
const latitude = 22.551512;
const longitude = 88.353779;

export async function getNearby() {
    // navigator.geolocation.getCurrentPosition(
    //     function (position) {
    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //         console.log("Latitude:", latitude);
    //         console.log("Longitude:", longitude);
    //     })

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${url}/potholes/?lat=${latitude}&lng=${longitude}`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}
