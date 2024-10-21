import { Link, useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import { getPosts } from "../models/posts.server";
import { getCurso } from "../models/curso.serve";
import ListadoGuitarras from "../components/instrumentos/listadoGuitarras";
import ListadoPosts from "../components/blog/listadoPosts";
import Curso from "../components/curso";
import stylesGuitarras from "~/styles/guitarras.css";
import stylesPost from "~/styles/blog.css";
import stylesCurso from "~/styles/curso.css";

export function links() {
  return [
    { rel: "stylesheet", href: stylesGuitarras },
    { rel: "stylesheet", href: stylesPost },
    { rel: "stylesheet", href: stylesCurso },
  ];
}

export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);

  return { guitarras: guitarras.data, posts: posts.data, curso: curso.data };
}

function Index() {
  const { guitarras, posts, curso } = useLoaderData();

  const limitedPosts = posts.slice(0, 3);
  const limitedGuitarras = guitarras.slice(0, 3);

  
  return (
    <>
      <section className="contenedor">
        <ListadoPosts posts={limitedPosts} />
        <Link className="enlace" to={`/blog`}>
          Ver mas blogs
        </Link>
      </section>
      <Curso curso={curso.attributes} />
      <main className=" contenedor">
        <ListadoGuitarras guitarras={limitedGuitarras} inicio={true} />
        <Link className="enlace" to={`/guitarras`}>
          Ver mas Guitarras
        </Link>
      </main>
    </>
  );
}

export default Index;
