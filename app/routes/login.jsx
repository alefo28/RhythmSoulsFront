import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { getusers } from "../models/users.server";

export async function loader() {
  const [users] = await Promise.all([getusers()]);

  return users.data;
}

export function meta({ data }) {
  return [
    { title: `Rhythm souls - Login` },
    {
      description: `Iniciar Sesion en Rhythm souls`,
    },
  ];
}

const Login = () => {
  const users = useLoaderData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({});

  const { login, user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user.mail != undefined) {
      navigate("/usuario");
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (![email, password].includes("")) {
      for (let index = 0; index < users.length; index++) {

        if (
          email == users[index].attributes.mail &&
          password == users[index].attributes.password
        ) {
          const user = {
            id: users[index].id,
            mail: users[index].attributes.mail,
            name: users[index].attributes.name,
            password: users[index].attributes.password,
          };
          login(user);
          navigate("/usuario");
          break;
        } else {
          window.alert("Algunos de los datos estan mal");
          break;
        }

      }

    } else {
      window.alert("Los campos no deben estar vacios");
    }
  };

  return (
    <>
      {loading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="heading">Login</h2>

          <form className="container" onSubmit={handleSubmit}>
            <div>
              <div>Correo:</div>

              <input
                type="email"
                className="centered-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div>Contraseña:</div>

              <input
                type="password"
                className="centered-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="centered-button">
              Iniciar Sesion
            </button>
            <div>
              <Link className="button-styled mt-3" to={`/register`}>
                ¿No tienes Cuenta? Registrate ahora...
              </Link>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
