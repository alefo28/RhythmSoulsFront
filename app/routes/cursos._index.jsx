import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import ListadoCursos from "../components/Cursos/ListadoCursos";
import { getCursosNew } from "../models/curso.serve";

export function meta() {
  return [
    {
      title: "Rhythm souls - Cursos",
    },
    {
      description: "Rhythm souls, Cursos ",
    },
  ];
}
export async function loader() {
  const Cursos = getCursosNew();
  return Cursos;
}

function Cursos() {
  const { user } = useOutletContext();
  const Cursos = useLoaderData();
  

  return (
    <>
      <h2 className="heading">Cursos</h2>
      {user.id === undefined || user.premium === false ? (
        <>
          <div className="mensaje-sesion">
            <p>
              Debes tener Premium para poder ver los cursos de Rhythm souls.
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
          {" "}
          <ListadoCursos  cursos={Cursos.data}/>
        </>
      )}
    </>
  );
}

export default Cursos;
