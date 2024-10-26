import React from "react";
import { deleteCompra } from "../../models/pago.serve";

export default function ListadoCompras({ compras }) {
  const comprasOrdenadas = [...compras].sort((a, b) => {
    return new Date(b.attributes.ordenDate) - new Date(a.attributes.ordenDate);
  });

  const handleCancel = async (id) => {
    // Lógica para cancelar la compra
    await deleteCompra(id);
    window.location.reload();
  };

  return (
    <div className="listado-compras">
      <h2 className="heading">Pedidos</h2>
      {compras.length > 0 ? (
        comprasOrdenadas.map((compra, index) => {
          const productos = compra.attributes.compra_productos.data;

          return (
            <div key={index} className="compras">
              <div className="compras-info">
                {/* Fecha de la compra */}
                <div className="compra-header">
                  <span className="fecha">
                    Compra realizada:{" "}
                    {new Date(compra.attributes.ordenDate).toLocaleDateString()}
                  </span>

                  <button
                    className="eliminar-boton"
                    onClick={() => handleCancel(compra.id)}
                  >
                    Cancelar Compra
                  </button>
                </div>

                {/* Total de la compra */}
                <div className="total">
                  <strong>Total:</strong> ${compra.attributes.total}
                </div>

                {/* Estado de la compra */}
                <div className="status">
                  <strong>Status:</strong> {compra.attributes.status}
                </div>

                {/* Mostrar lista de productos */}
                <div className="productos">
                  <h4>Productos comprados:</h4>
                  <ul>
                    {productos.map((producto, idx) => {
                      const instrumento =
                        producto?.attributes.guitarra.data?.attributes;

                      return (
                        <li key={idx}>
                          {instrumento.nombre} - {producto.Amount} x $
                          {instrumento.precio}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No haz comprado nada.</p>
      )}
    </div>
  );
}
