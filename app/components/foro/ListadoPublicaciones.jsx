import React from "react";
import image from "../../../public/img/messenger.png";
import { Link } from "@remix-run/react";
import { formatFecha } from "../../utils/helpers";
import { deletePublicacion } from "../../models/publicacions.serve";

export default function ListadoPublicaciones({ publicaciones, profile }) {
  const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
    return new Date(b.attributes.date) - new Date(a.attributes.date);
  });

  const handleDelete = async (id) => {
    await deletePublicacion(id);
    window.location.reload();
  };
  return (
    <div className="listado-publicaciones">
      {publicaciones.length > 0 ? (
        publicacionesOrdenadas.map((publicacion, index) => (
          <div key={index} className="publicacion">
            <div className="publicacion-info">
              {!profile && (
                <span className="autor">{publicacion.attributes.author}</span>
              )}

              <span className="fecha">
                {formatFecha(publicacion.attributes.date)}
              </span>
            </div>
            <h3>{publicacion.attributes.title}</h3>
            <p>{publicacion.attributes.content}</p>
            <Link to={`/foro/${publicacion.attributes.url}`}>
              <button className="comentarios-boton"> 💬 Comentarios</button>
            </Link>
            {profile && (
              <button
                className="eliminar-boton"
                onClick={() => handleDelete(publicacion.id)}
              >
                🗑️ Eliminar
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
}
