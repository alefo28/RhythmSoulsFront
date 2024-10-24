export async function getPosts() {
  const respuesta = await fetch(
    `https://rhythmsoulsback.onrender.com/api/posts?populate=imagen`
  );

  return await respuesta.json();
}

export async function getPost(url) {
  const respuesta = await fetch(
    `https://rhythmsoulsback.onrender.com/api/posts?filters[url]=${url}&populate=imagen`
  );
  return await respuesta.json();
}

