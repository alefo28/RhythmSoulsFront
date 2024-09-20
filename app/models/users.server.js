export async function getusers() {
  const respuesta = await fetch(`${process.env.API_URL}/user-apis`);

  return await respuesta.json();
}

export async function postUser(user) {
  console.log(user, "direccion Backend");
  const respuesta = await fetch(`${process.env.API_URL}/user-apis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: user,
    }),
  });

  return await respuesta.json();
}

export async function putUser(id, user) {
  const respuesta = await fetch(`${process.env.API_URL}/user-apis/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: user,
    }),
  });

  return await respuesta.json();
}
