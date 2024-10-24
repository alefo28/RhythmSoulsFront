export async function getPublicaciones() {
    const respuesta = await fetch(
        `https://rhythmsoulsback.onrender.com/api/publicacions`
    );

    return await respuesta.json();
}

export async function postPublicaciones(publicacion) {

    const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/publicacions`, {
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

export async function getPublicacion(url) {
    const respuesta = await fetch(
        `https://rhythmsoulsback.onrender.com/api/publicacions?filters[url]=${url}&populate=user_api&populate=comments`
    );
    return await respuesta.json();

}

export async function postComments(data) {

    const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: data,
        }),
    });

    return await respuesta.json();
}

export async function getComments() {
    const respuesta = await fetch(
        `https://rhythmsoulsback.onrender.com/api/comments`
    );
    return await respuesta.json();

}

export async function getPublicacionesUser(id) {

    const respuesta = await fetch(
        `https://rhythmsoulsback.onrender.com/api/publicacions?filters[user_api]=${id}`
    );
    return await respuesta.json();

}

export async function deletePublicacion(id) {
    try {
        const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/publicacions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar la publicación');
        }

        const data = await respuesta.json();


    } catch (error) {
        console.error('Error:', error);
    }
}