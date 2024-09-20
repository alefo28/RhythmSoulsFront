import { Link, Outlet, useOutletContext } from "@remix-run/react";
import PublicacionForo from "../components/foro/inputForo";

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
  return [];
}

function Foro() {
  const { user } = useOutletContext();
  return (
    <>
      <h2 className="heading">Foro</h2>
      {user.id === undefined ? (
        <>
          <div className="mensaje-sesion">
            <p>Debes iniciar sesión para poder publicar en el foro.</p>
            <Link to="/login">
              <button>Iniciar Sesión</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {" "}
          <PublicacionForo />
        </>
      )}
    </>
  );
}

export default Foro;
