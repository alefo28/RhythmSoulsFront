import { Outlet, useOutletContext } from "@remix-run/react";

import styles from "~/styles/foro.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function Foro() {
  const { user } = useOutletContext();
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
    </main>
  );
}

export default Foro;
