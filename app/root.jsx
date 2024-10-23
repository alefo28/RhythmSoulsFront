import { useState, useEffect } from "react";
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { PutUsuarioPremium } from "./models/users.serve";

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "Rhythm souls - Remix" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
  ];
}

export default function App() {
  const carritoLS =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("carrito"))) ||
    [];
  const [carrito, setCarrito] = useState(carritoLS);

  const UserLS =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("usuario"))) ||
    [];

  const [user, setUser] = useState(UserLS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("usuario", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      //Elementos duplicados
      //iterar sobre el arreglo e identificar el elemtento duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          //reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad;
        }

        return guitarraState;
      });
      //Añadir al carrito y reescribirlos
      setCarrito(carritoActualizado);
    } else {
      //registro nuevo agregrar al carrito
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }

      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };

  const login = (user) => {
    setUser(user);
  };

  const deleteCarrito = () => {
    setCarrito([]);
  };

  const handlePremium = async (e) => {
    e.preventDefault();

    await PutUsuarioPremium(user.id);
    setUser((prevUser) => ({
      ...prevUser, // Copia el objeto anterior
      premium: true, // Cambia el atributo premium a true
    }));

    window.location.reload();
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          setCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
          user,
          login,
          deleteCarrito,
          handlePremium,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />

        {children}
        <Footer />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/*Manejo de errores*/

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status}
          {error.statusText}
        </p>
        <Link to="/" className="error-enlace">
          Tal vez quieras volver a la pagina principal
        </Link>
      </Document>
    );
  }
}
