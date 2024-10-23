import { Link, useLocation, useOutletContext } from "@remix-run/react";
import imagen from "../../public/img/carrito.png";
import imagenUsuario from "../../public/img/icons8-usuario-24.png";

function Navegacion() {
  const location = useLocation();

  return (
    <nav className="navegacion">
      {/* <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        {" "}
        Inicio
      </Link> */}
      <Link
        to="/nosotros"
        className={location.pathname === "/nosotros" ? "active" : ""}
      >
        {" "}
        Nosotros
      </Link>
      <Link
        to="/guitarras"
        className={location.pathname === "/guitarras" ? "active" : ""}
      >
        {" "}
        Tienda
      </Link>
      <Link
        to="/blog"
        className={location.pathname === "/blog" ? "active" : ""}
      >
        {" "}
        Blog
      </Link>
      <Link
        to="/foro"
        className={location.pathname === "/foro" ? "active" : ""}
      >
        {" "}
        Foro
      </Link>

      <Link
        to="/songs"
        className={location.pathname === "/songs" ? "active" : ""}
      >
        {" "}
        Canciones
      </Link>
      <Link
        to="/cursos"
        className={location.pathname === "/cursos" ? "active" : ""}
      >
        {" "}
        Cursos
      </Link>

      <Link
        to="/compras"
        className={location.pathname === "/compras" ? "active" : ""}
      >
        {" "}
        Pedidos
      </Link>

      <Link to="/carrito">
        {" "}
        <img src={imagen} alt="Carrito de compras " />
      </Link>
      <Link to="/usuario">
        {" "}
        <img className="penultimo" src={imagenUsuario} alt="usuario" />
      </Link>
    </nav>
  );
}

export default Navegacion;
