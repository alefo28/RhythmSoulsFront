import { getGuitarras } from "~/models/guitarras.server";
import { useLoaderData } from "@remix-run/react";
import ListadoGuitarras from "../components/instrumentos/listadoGuitarras";

export function meta() {
  return [
    { title: "Rhythm souls - Tienda de Instrumentos" },
    {
      description: "Rhythm souls - Nuestra Coleccion de Instrumentos",
    },
  ];
}

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return <ListadoGuitarras guitarras={guitarras} inicio={false} />;
}

export default Tienda;
