export async function getPublicaciones() {
    const respuesta = await fetch(
        `${process.env.REACT_APP_API_URL}/publicacions`
    );

    return await respuesta.json();
}

export async function postPublicaciones(publicacion) {

    const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/publicacions`, {
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
        `${process.env.REACT_APP_API_URL}/publicacions?filters[url]=${url}&populate=user_api&populate=comments`
    );
    return await respuesta.json();

}

export async function postComments(data) {

    const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
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
        `${process.env.REACT_APP_API_URL}/comments`
    );
    return await respuesta.json();

}

export async function getPublicacionesUser(id) {

    const respuesta = await fetch(
        `${process.env.REACT_APP_API_URL}/publicacions?filters[user_api]=${id}`
    );
    return await respuesta.json();

}

export async function deletePublicacion(id) {
    try {
        const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/publicacions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!respuesta.ok) {
            throw new Error('Error al eliminar la publicación');
        }

        const data = await respuesta.json();
        console.log('Publicación eliminada:', data);


    } catch (error) {
        console.error('Error:', error);
    }
}