import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { getCursoNew } from "../models/curso.serve";
import { formatearFecha } from "../utils/helpers";
import Comments from "../components/foro/comments";
import { useState } from "react";
import { postComments } from "../models/publicacions.serve";

export async function loader({ request, params }) {
  const { url } = params;
  const curso = await getCursoNew(url);

  //Si no encuentra la guitarra lanzamos un error
  if (curso.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: `/ curso no encontrada`,
    });
  }

  return curso;
}

export function meta({ data }) {
  if (!data) {
    return [
      { title: `Rhythm souls - Curso no encontrado` },
      {
        description: `Musica , Tutoriales, Curso no encontrado`,
      },
    ];
  }

  return [
    { title: `Rhythm souls - ${data.data[0].attributes.nombre}` },
    {
      description: `Musica , Tutoriales, Curso ${data.data[0].attributes.nombre}`,
    },
  ];
}

function Curso() {
  const Curso = useLoaderData();
  const { user } = useOutletContext();
  const [nuevoComentario, setNuevoComentario] = useState("");

  const { titulo, contenido, video, comments, publishedAt } =
    Curso.data[0]?.attributes;

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
        cursos_new: Curso.data[0].id,
        user_api: user.id,
      };

      try {
        await postComments(data);
        setNuevoComentario("");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const comentariosOrdenadas = [...comments.data].sort((a, b) => {
    return new Date(b.attributes.date) - new Date(a.attributes.date);
  });
  console.log(user);

  return (
    <article className="post mt-3">
      {user.id !== undefined && user.premium === true ? (
        <>
          <video
            className="video"
            src={video?.data?.attributes?.url}
            controls // Muestra los controles del video (reproducir, pausa, volumen, etc.)
            loop // El video se reproducirá en bucle una vez que termine
            playsInline // Asegura que el video se reproduzca en línea en móviles, sin pantalla completa
            width="100%" // Asegura que el video ocupe el ancho del contenedor
            alt={`video curso ${titulo}`}
          />
          <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="text">{contenido}</p>
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
      ) : (
        <div className="mensaje-sesion">
          <p> Debes tener Premium para poder ver los cursos de Rhythm souls.</p>
          {user.id === undefined ? (
            <Link to="/login">
              <button className="boton-iniciar-sesion">Iniciar Sesión</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="boton-iniciar-sesion">Compra Premium</button>
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

export default Curso;
