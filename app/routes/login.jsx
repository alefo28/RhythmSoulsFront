import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { getUser } from "../models/users.serve";

export async function loader() {
  return [];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![email, password].includes("")) {
      try {
        const Login = await getUser(email);
        const userLogin = Login.data[0];

        if (Login.data.length === 0 || userLogin.attributes.password !== password) {
          window.alert("Algunos de los datos estan erroneos");
        } else {
          let user = {
            id: userLogin.id,
            mail: userLogin.attributes.mail,
            name: userLogin.attributes.name,
            password: userLogin.attributes.password,
            premium: userLogin.attributes.premium,
          };

          login(user);
          navigate("/usuario");
        }
      } catch (error) {
        console.log(error);
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
