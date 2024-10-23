import { Link } from "@remix-run/react";
import React from "react";
import { formatearFecha } from "~/utils/helpers";

export default function ListadoCursos({ cursos }) {
  return (
    <div>
      <div className="Cursos">
        {cursos?.map((curso, index) => (
          <article key={index} className="post">
            <img
              className="imagen"
              src={curso.attributes.imagen.data.attributes.url}
              alt={`imagen curso ${curso.attributes.Title}`}
            />

            <div className="contenido">
              <h3>{curso.attributes.Title}</h3>
              <p className="fecha">
                {formatearFecha(curso.attributes.publishedAt)}
              </p>
              <p className="resumen">{curso.attributes.content}</p>
              <Link className="enlace" to={`/cursos/${curso.attributes.url}`}>
                Ver Curso
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
