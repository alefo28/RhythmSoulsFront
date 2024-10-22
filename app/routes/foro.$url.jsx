import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { getPublicacion } from "../models/publicacions.serve";
import Comments from "../components/foro/comments";
import { formatFecha } from "../utils/helpers";
import { postCommentsCursos } from "../models/curso.serve";

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
  let publicacion;
  try {
    publicacion = await getPublicacion(url);
  } catch (error) {
    console.log(error);
  }

  return publicacion;
}

export default function Foro() {
  const post = useLoaderData();
  const { user } = useOutletContext();

  const { user_api, content, date, title, comments } = post.data[0].attributes;

  const [nuevoComentario, setNuevoComentario] = useState("");

  const manejarCambio = (e) => {
    setNuevoComentario(e.target.value);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() !== "") {
      const data = {
        author: user.name,
        date: new Date().toISOString(),
        content: nuevoComentario,
        like: 0,
        publicacion: post.data[0].id,
        user_api: user.id,
      };

      try {
        await postCommentsCursos(data);
      } catch (error) {
        console.log(error);
      }

      setNuevoComentario("");
      window.location.reload();
    }
  };

  const comentariosOrdenadas = [...comments.data].sort((a, b) => {
    return new Date(b.attributes.date) - new Date(a.attributes.date);
  });

  return (
    <>
      <h2 className="heading">Publicacion</h2>

      <div className="publicacion">
        <div className="publicacion-info">
          <span className="autor">{user_api.data.attributes.name}</span>
          <span className="fecha">{formatFecha(date)}</span>
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>

      <h2 className="heading">Comentarios</h2>

      <div className="agregar-comentario">
        {user.id !== undefined ? (
          <>
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
          </>
        ) : (
          <div className="mensaje-sesion">
            <p>Por favor, inicia sesión para agregar un comentario.</p>
            <Link to="/login">
              <button className="boton-iniciar-sesion">Iniciar Sesión</button>
            </Link>
          </div>
        )}
      </div>

      <div className="listado-comentarios">
        {comments.data.length > 0 ? (
          comentariosOrdenadas.map((comentario, index) => (
            <div key={comentario.id}>
              <Comments comentario={comentario} />
            </div>
          ))
        ) : (
          <p>No hay comentarios para mostrar.</p>
        )}
      </div>
    </>
  );
}
