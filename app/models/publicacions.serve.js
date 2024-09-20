export async function postPublicaciones(publicacion) {

    const respuesta = await fetch(`${process.env.API_URL}/publicacions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: publicacion,
        }),
    });

    return await respuesta.json();
}