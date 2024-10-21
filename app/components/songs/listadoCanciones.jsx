import { useState } from "react";
import search from "public/img/icons8-search.svg";

function ListaCanciones({ songs }) {
  const [cancionActual, setCancionActual] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const seleccionarCancion = (cancion) => {

    if (cancionActual?.attributes.Url !== cancion.attributes.Url) {
      setCancionActual(cancion);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const cancionesFiltradas = songs.filter((cancion) => {
    const { Title, Artist } = cancion.attributes;
    return (
      Title.toLowerCase().includes(busqueda.toLowerCase()) ||
      Artist.toLowerCase().includes(busqueda.toLowerCase())
    );
  });


  return (
    <div className="lista-canciones">
      <div className="divbusqueda">
        <img
          src={search}
          alt="Search"
          style={{ width: "30px", height: "30px" }}
        />
        <input
          type="text"
          placeholder="Buscar por título o artista"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="busqueda"
        />
      </div>
      {cancionActual && (
        <>
          <div className="info-cancion">
            <h3>{cancionActual.attributes.Title}</h3>
            <p>{cancionActual.attributes.Artist}</p>
          </div>
          <audio
            src={cancionActual.attributes.Url.data.attributes.url}
            controls
            autoPlay={true}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{ marginTop: "20px" }}
          />
        </>
      )}
      <ul className="lista-canciones-grid">
        {cancionesFiltradas.map((cancion) => (
          <li key={cancion.id}>
            <button
              className={`boton-cancion ${
                cancionActual?.attributes.Url === cancion.attributes.Url
                  ? "reproduciendo"
                  : ""
              }`}
              onClick={() => seleccionarCancion(cancion)}
            >
              {cancionActual?.attributes.Url === cancion.attributes.Url &&
              isPlaying
                ? "⏸"
                : "▶"}
              - {cancion.attributes.Title} - {cancion.attributes.Artist}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCanciones;
