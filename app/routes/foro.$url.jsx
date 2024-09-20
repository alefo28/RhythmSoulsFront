import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export function meta({ data }) {
  if (!data) {
    return [
      { title: `Rhythm souls - Entrada no encontrada` },
      {
        description: `Rhythm souls - Publicacion no encontrada`,
      },
    ];
  }

  return [
    { title: `Rhythm souls - Publicacion de` },
    {
      description: `Publicacion de `,
    },
  ];
}

export async function loader({ params }) {
  const { url } = params;
  //const post = await getPost(url);

  return [];
}

export default function Foro() {
  const post = useLoaderData();

  const comentarios = [
    {
      contenido: "¡Gran publicación! Gracias por compartir.",
      autor: "Ana Torres",
      fecha: "2024-09-19",
    },
    {
      contenido: "Estoy de acuerdo, esto es muy útil.",
      autor: "Luis Martínez",
      fecha: "2024-09-18",
    },
    {
      contenido: "Me encantaría saber más sobre este tema.",
      autor: "Pedro Gómez",
      fecha: "2024-09-17",
    },
  ];

  const publicacion = {
    titulo: "Aprendiendo JavaScript",
    contenido:
      "JavaScript es un lenguaje versátil y poderoso. ¡Estoy emocionado por aprender más!",
    autor: "Laura Martínez",
    fecha: "2024-09-19",
  };

  const [nuevoComentario, setNuevoComentario] = useState("");

  const manejarCambio = (e) => {
    setNuevoComentario(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() !== "") {
      //onAgregarComentario(nuevoComentario);
      setNuevoComentario(""); // Limpiar el input después de enviar
    }
  };

  return (
    <>
      <h2 className="heading">Publicacion</h2>

      <div className="publicacion">
        <div className="publicacion-info">
          <span className="autor">{publicacion.autor}</span>
          <span className="fecha">{publicacion.fecha}</span>
        </div>
        <h3>{publicacion.titulo}</h3>
        <p>{publicacion.contenido}</p>
      </div>

      <h2 className="heading">Comentarios</h2>

      <div className="agregar-comentario">
        <input
          type="text"
          value={nuevoComentario}
          onChange={manejarCambio}
          placeholder="Escribe un comentario..."
          className="input-comentario"
        />
        <button onClick={manejarEnvio} className="boton-agregar">
          Agregar
        </button>
      </div>

      <div className="listado-comentarios">
        {comentarios.length > 0 ? (
          comentarios.map((comentario, index) => (
            <div key={index} className="comentario">
              <div className="comentario-info">
                <span className="autor">{comentario.autor}</span>
                <span className="fecha">{comentario.fecha}</span>
              </div>
              <p>{comentario.contenido}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios para mostrar.</p>
        )}
      </div>
    </>
  );
}
