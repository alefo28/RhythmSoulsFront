import { useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { postCompraProduct, postNuevaCompra } from "../models/pago.serve";

const ModalPago = ({ isOpen, onClose, compra }) => {
  if (!isOpen) return null;
  const [address, setAddress] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [CVV, setCVV] = useState("");
  const { setCarrito, carrito } = useOutletContext();

  const handlePay = async () => {
    if (confirm("¿Se esta realizando una compra?")) {
      const carritoSend = {
        user_api: compra.user_api,
        total: compra.total,
        address: address,
        ordenDate: new Date(),
      };

      const nuevaCompra = await postNuevaCompra(carritoSend);

      const compraId = nuevaCompra.data.id;

      for (const producto of carrito) {
        const data = {
          compra: compraId,
          guitarra: producto.id,
          Amount: producto.cantidad,
        };
        await postCompraProduct(data);
      }
      setCarrito([]);
      alert("Compra Exitosa ");
      window.location.href = `/guitarras`;
      return;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Pagar Compra</h2>

        <div>
          <label>Número de tarjeta</label>
          <input type="text" placeholder="1234 5678 9123 4567" />
        </div>
        <div>
          <label>Nombre del titular</label>
          <input type="text" placeholder="Nombre del titular" />
        </div>
        <div>
          <label>Fecha de vencimiento</label>
          <input type="text" placeholder="MM/AA" />
        </div>
        <div>
          <label>Código CVV</label>
          <input type="text" placeholder="123" />
        </div>
        <div>
          <label>Direccion de Envio</label>
          <input type="text" placeholder="Calle 123, Av. 123, Mty, NL" />
        </div>
        <button onClick={handlePay}>Pagar</button>

        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalPago;
