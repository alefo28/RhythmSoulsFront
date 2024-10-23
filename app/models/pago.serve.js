
export async function postNuevaCompra(data) {

    const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/compras`, {
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


export async function postCompraProduct(data) {

    const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/compra-productos`, {
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

export async function getCompras(id) {
    const respuesta = await fetch(
        `${process.env.REACT_APP_API_URL}/compras?filters[user_api]=${id}&populate=compra_productos.guitarra`
    );
    return await respuesta.json();

}

export async function deleteCompra(id) {
    try {
      // Eliminar la compra principal
      const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/compras/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar la compra');
      }
  
      // Ahora eliminar los productos asociados
      const productosRespuesta = await fetch(
        `${process.env.REACT_APP_API_URL}/compra-productos?filters[compra]=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!productosRespuesta.ok) {
        throw new Error('Error al eliminar los productos asociados');
      }
  
      return await productosRespuesta.json();
    } catch (error) {
      console.error('Error eliminando la compra y sus productos:', error);
    }
  }
  