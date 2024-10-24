import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import PublicacionForo from "../components/foro/inputForo";
import ListadoPublicaciones from "../components/foro/ListadoPublicaciones";
import { getPublicaciones } from "../models/publicacions.serve";

export function meta() {
  return [
    {
      title: "Rhythm souls - Foro",
    },
    {
      description: "Rhythm souls, Foro de musica ",
    },
  ];
}
export async function loader() {
  const publicaciones = getPublicaciones();
  return publicaciones;
}

function Foro() {
  const { user } = useOutletContext();
  const publicaciones = useLoaderData();

  return (
    <>
      <h2 className="heading">Foro</h2>
      {user.id === undefined ? (
        <>
          <div className="mensaje-sesion">
            <p>Debes iniciar sesión para poder publicar en el foro.</p>
            <Link to="/login">
              <button className="boton-iniciar-sesion">Iniciar Sesión</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {" "}
          <PublicacionForo />
        </>
      )}
      {/* <h3 className="heading">Publicaciones</h3> */}

      <ListadoPublicaciones
        publicaciones={publicaciones.data}
        profile={false}
      />
    </>
  );
}

export default Foro;
