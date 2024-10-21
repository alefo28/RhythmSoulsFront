import { Outlet, useOutletContext } from "@remix-run/react";

export function meta({ data }) {
    return [
      { title: `Rhythm souls - Compras` },
      {
        description: `Compras en Rhythm souls`,
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
  
  export default Compras