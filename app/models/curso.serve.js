export async function getCurso() {

  const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/curso?populate=imagen`);
  return await respuesta.json();

}


export async function getCursosNew() {
  const respuesta = await fetch(
    `https://rhythmsoulsback.onrender.com/api/cursos-news?populate=imagen`
  );

  return await respuesta.json();
}


export async function getCursoNew(url) {
  const respuesta = await fetch(
    `https://rhythmsoulsback.onrender.com/api/cursos-news?filters[url]=${url}&populate=video&populate=comments`
  );
  return await respuesta.json();

}

export async function postCommentsCursos(data) {

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
