import { useLoaderData, useOutletContext, Link } from "@remix-run/react";
import { getGuitarra } from "../models/guitarras.server";
import { useState } from "react";

export async function loader({ request, params }) {
  const { url } = params;
  const guitarra = await getGuitarra(url);

  //Si no encuentra la guitarra lanzamos un error
  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: `/ Guitarra no encontrada`,
    });
  }

  return guitarra;
}

export function meta({ data }) {
  if (!data) {
    return [
      { title: `Rhythm souls - Instrumento no encontrado` },
      {
        description: `Musica , venta de Instrumentos, Instrumento no encontrado`,
      },
    ];
  }

  return [
    { title: `Rhythm souls - ${data.data[0].attributes.nombre}` },
    {
      description: `Musica , venta de Instrumentos, Instrumento ${data.data[0].attributes.nombre}`,
    },
  ];
}

function Guitarra() {
  const { agregarCarrito, user } = useOutletContext();
  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Debes selecionar una cantidad");
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };

    agregarCarrito(guitarraSeleccionada);
    alert("Producto agregado en el carrito");
    window.location.href = `/guitarras`;
  };

  return (
    <div className=" guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen de la guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>

          <select id="cantidad" onChange={(e) => setCantidad(+e.target.value)}>
            <option value="">-- Seleccione --</option>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {user.name == undefined ? (
            <Link className="centered-button" to={"/login"}>
              Inicia sesion Primero
            </Link>
          ) : (
            <input type="submit" value="Agregar al carrito" />
          )}
        </form>
      </div>
    </div>
  );
}

export default Guitarra;
