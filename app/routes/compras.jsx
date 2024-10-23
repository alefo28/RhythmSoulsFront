import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/compra.css";

export function meta({ data }) {
  return [
    { title: `Rhythm souls - Compras` },
    {
      description: `Compras en Rhythm souls`,
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

function Compras() {
  const { user } = useOutletContext();
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
    </main>
  );
}

export default Compras;
