const url = import.meta.env.VITE_BACKEND_URL;

export async function getImageUploadToken() {
    try {
        const response = await fetch(`${url}/images/upload`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            console.error(response);
            throw new Response("Failed get image upload token");
        }

        return await response.json();
    } catch (error) {
        throw new Response("Something went wrong while getting image upload token");
    }
}

export async function getImageVerification() {

}