import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";
import ModalPago from "../components/modalPago";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return [
    { title: "Rhythm souls - Carrito de Compras" },
    {
      description:
        "Venta de Instrumentos, musica, blog de musica, carrito de compras, tienda",
    },
  ];
}

export default function Carrito() {
  const [total, setTotal] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const { user, carrito, setCarrito, actualizarCantidad, eliminarGuitarra } =
    useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  const compra = {
    user_api: user.id,
    total: total,
  };

  const openModal = () => {
    if (carrito.length === 0) {
      window.location.href = `/guitarras`;
      return;
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ClientOnly fallback={"Cargando ..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading"> Carrito de compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0
                ? "Carrito Vacio "
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen del producto ${producto.nombre}`}
                        />
                      </div>

                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>Cantidad: </p>
                        <select
                          value={producto.cantidad}
                          className="select"
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: +e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <p className="precio">
                          $ <span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: ${" "}
                          <span>{producto.precio * producto.cantidad}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn_eliminar"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
            </div>
            <aside className=" resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar ${total}</p>

              <input
                onClick={openModal}
                type="button"
                value={carrito.length === 0 ? `Ir a la tienda` : "Pagar"}
              />
            </aside>
          </div>
          <ModalPago
            isOpen={isModalOpen}
            onClose={closeModal}
            compra={compra}
          />
        </main>
      )}
    </ClientOnly>
  );
}
