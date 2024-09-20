import React from "react";
import image from "../../../public/img/messenger.png";
import { Link } from "@remix-run/react";

export default function ListadoPublicaciones({ publicaciones }) {
  return (
    <div className="listado-publicaciones">
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion, index) => (
          <div key={index} className="publicacion">
            <div className="publicacion-info">
              <span className="autor">{publicacion.autor}</span>
              <span className="fecha">{publicacion.fecha}</span>
            </div>
            <h3>{publicacion.titulo}</h3>
            <p>{publicacion.contenido}</p>
            <Link to={`/foro/${publicacion.url}`}>
              <button className="comentarios-boton"> 💬 Comentarios</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
}
