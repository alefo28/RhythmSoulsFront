export async function getCurso() {

  const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/curso?populate=imagen`);
  return await respuesta.json();

}
