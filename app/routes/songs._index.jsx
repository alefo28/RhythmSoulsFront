import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import ListaCanciones from "../components/songs/listadoCanciones";
import { getSongs } from "../models/songs.serve";

export function meta() {
  return [
    {
      title: "Rhythm souls - Canciones",
    },
    {
      description: "Rhythm souls, Canciones ",
    },
  ];
}
export async function loader() {
  const songs = await getSongs();
  return songs.data;
}

function Foro() {
  const { user } = useOutletContext();
  const songs = useLoaderData();

  return (
    <>
      <h2 className="heading">Canciones</h2>
      {user.id === undefined || user.premium === false ? (
        <>
          <div className="mensaje-sesion">
            <p>
              Debes tener Premium para poder escuchar las canciones de Rhythm
              souls.
            </p>
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
        </>
      ) : (
        <>
          <ListaCanciones songs={songs} />{" "}
        </>
      )}
      {/* <h3 className="heading">Publicaciones</h3> */}
    </>
  );
}

export default Foro;
