import { useState } from "react";
import Guitarra from "./guitarra";

export default function ListadoGuitarras({ guitarras, inicio }) {
  const [selectedInstrument, setSelectedInstrument] = useState("All");

  // Función para manejar el cambio en el select
  const handleInstrumentChange = (event) => {
    setSelectedInstrument(event.target.value);
  };

  // Filtrar los instrumentos según la selección
  const filteredInstruments =
    selectedInstrument === "All"
      ? guitarras
      : guitarras.filter(
          (instrument) =>
            instrument.attributes.instrument === selectedInstrument
        );

  return (
    <>
      <h2 className="heading">Nuestra Colección</h2>
      {!inicio && (
        <div className="Instrumentos">
          <label htmlFor="test">Instrumentos</label>

          <select id="test" onChange={handleInstrumentChange}>
            <option value="All">All</option>
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
            <option value="Drums">Drums</option>
            <option value="Violin">Violin</option>
            <option value="Bass">Bass</option>
            <option value="Saxophone">Saxophone</option>
            <option value="Trumpet">Trumpet</option>
            <option value="Flute">Flute</option>
            <option value="Cello">Cello</option>
            <option value="Clarinet">Clarinet</option>
            <option value="Ukulele">Ukulele</option>
            <option value="Banjo">Banjo</option>
            <option value="Harmonica">Harmonica</option>
            <option value="Accordion">Accordion</option>
            <option value="Trombone">Trombone</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}

      {guitarras.length && (
        <div className="guitarras-grid">
          {filteredInstruments?.map((guitarra) => (
            <Guitarra key={guitarra?.id} guitarra={guitarra?.attributes} />
          ))}
        </div>
      )}
    </>
  );
}
