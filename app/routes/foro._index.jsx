import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import PublicacionForo from "../components/foro/inputForo";
import ListadoPublicaciones from "../components/foro/Listadopublicaciones";

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
  return [
    {
      titulo: "Aprendiendo React",
      contenido:
        "Hoy empecé a aprender React y me parece fascinante. ¡No puedo esperar a construir mi primera aplicación!",
      autor: "Juan Pérez",
      fecha: "2024-09-19",
      url: "2",
    },
    {
      titulo: "Consejos para Guitarristas",
      contenido:
        "Siempre calienta tus dedos antes de tocar y practica regularmente. La constancia es clave.",
      autor: "María López",
      fecha: "2024-09-18",
      url: "3",
    },
    {
      titulo: "Mis Instrumentos Favoritos",
      contenido:
        "Me encantan la guitarra y el piano. Ambos tienen un sonido único que me inspira.",
      autor: "Carlos González",
      fecha: "2024-09-17",
      url: "4",
    },
  ];
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
      {/* <h3 className="heading">Publicaciones</h3> */}

      <ListadoPublicaciones publicaciones={publicaciones} />
    </>
  );
}

export default Foro;
