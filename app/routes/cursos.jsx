import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/cursos.css";


export function meta({ data }) {
  return [
    { title: `Rhythm souls - Cursos` },
    {
      description: `Cursos en Rhythm souls`,
    },
  ];
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function Cursos() {
  const { user } = useOutletContext();
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
    </main>
  );
}

export default Cursos;
