import { Link } from "@remix-run/react";
import logo from "../../public/img/logoTest.png";
import Navegacion from "./navegacion";
function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/" className="logo">
          <img className="logo" src={logo} alt="Imagen logo " />
        </Link>
        <Navegacion />
      </div>
    </header>
  );
}

export default Header;
