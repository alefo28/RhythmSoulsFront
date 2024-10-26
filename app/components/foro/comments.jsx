import React from "react";
import { formatFecha } from "../../utils/helpers";

export default function Comments(coments) {

  const { author, date, content } = coments?.comentario?.attributes;

  return (
    <div className="comentario">
      <div className="comentario-info">
        <span className="autor">{author}</span>
        <span className="fecha">{formatFecha(date)}</span>
      </div>
      <p>{content}</p>
    </div>
  );
}
