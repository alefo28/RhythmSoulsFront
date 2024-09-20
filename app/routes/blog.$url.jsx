import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

export function meta({ data }) {
  if (!data) {
    return [
      { title: `Rhythm souls - Entrada no encontrada` },
      {
        description: `Rhythm souls - Blog no encontrada`,
      },
    ];
  }

  return [
    { title: `Rhythm souls - ${data.data[0].attributes.titulo}` },
    {
      description: `${data.data[0].attributes.titulo}`,
    },
  ];
}

export async function loader({ params }) {
  const { url } = params;
  const post = await getPost(url);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "/ Entrada no encontrada",
    });
  }
  return post;
}

export default function Post() {
  const post = useLoaderData();

  const { titulo, contenido, imagen, publishedAt } = post.data[0]?.attributes;
  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen.data?.attributes?.url}
        alt={`imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="text">{contenido}</p>
      </div>
    </article>
  );
}
