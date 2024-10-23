export async function getSongs() {
 
    const respuesta = await fetch(
      `${process.env.REACT_APP_API_URL}/songs?populate=Url`
    );

    return await respuesta.json();
 
}
