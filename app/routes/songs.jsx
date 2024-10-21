import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/songs.css";

export function meta({ data }) {
  return [
    { title: `Rhythm souls - Canciones` },
    {
      description: `Canciones en Rhythm souls`,
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

function Songs() {
  const { user } = useOutletContext();
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
    </main>
  );
}

export default Songs;
