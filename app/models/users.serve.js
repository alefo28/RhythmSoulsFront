export async function getusers() {
  const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/user-apis`);

  return await respuesta.json();
}



export async function postUser(user) {
  const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/user-apis`, {
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
  const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/user-apis/${id}`, {
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


export const getUser = async (email) => {

  const respuesta = await fetch(
    `https://rhythmsoulsback.onrender.com/api/user-apis/?filters[mail]=${email}`
  );
  return await respuesta.json();

}


export async function PutUsuarioPremium(userId) {
  try {
    // Realizar la petición PUT para actualizar el usuario
    const respuesta = await fetch(`https://rhythmsoulsback.onrender.com/api/user-apis/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          premium: true,  // Cambiar premium a true
        },
      }),
    });

    // Verificar si la respuesta fue exitosa
    if (!respuesta.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    // Retornar la respuesta en formato JSON
    const usuarioActualizado = await respuesta.json();
    return usuarioActualizado;
  } catch (error) {
    console.error('Error al actualizar el estado premium del usuario:', error);
  }
}
