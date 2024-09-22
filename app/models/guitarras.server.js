export async function getGuitarras() {
 
    const respuesta = await fetch(
      `${process.env.REACT_APP_API_URL}/guitarras?populate=imagen`
    );

    return await respuesta.json();
 
}

export async function getGuitarra(url) {
  const respuesta = await fetch(
    `${process.env.REACT_APP_API_URL}/guitarras?filters[url]=${url}&populate=imagen`
  );
  return await respuesta.json();
  
}
