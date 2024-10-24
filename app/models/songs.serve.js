export async function getSongs() {
 
    const respuesta = await fetch(
      `https://rhythmsoulsback.onrender.com/api/songs?populate=Url`
    );

    return await respuesta.json();
 
}
