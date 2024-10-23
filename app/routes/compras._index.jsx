import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { getCompras } from "../models/pago.serve";
import { useEffect, useState } from "react";
import ListadoCompras from "../components/compras/ListadoCompras";

export function meta() {
  return [
    {
      title: "Rhythm souls - Compras",
    },
    {
      description: "Rhythm souls, Blog de musica y venta",
    },
  ];
}

function Compras() {
  const { user } = useOutletContext();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const obtenerCompras = async () => {
      if (user?.id) {
        const comprasData = await getCompras(user.id);
        setCompras(comprasData.data);
      }
    };

    obtenerCompras();
  }, [user]);

  return (
    <>
      {user.id === undefined ? (
        <>
          <div className="mensaje-sesion">
            <p>Inicia sesion para ver tus pedidos.</p>

            <Link to="/login">
              <button className="boton-iniciar-sesion">Iniciar Sesión</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <ListadoCompras compras={compras} />
        </>
      )}
    </>
  );
}

export default Compras;
