import { LoaderArgs, ActionArgs } from "@remix-run/node";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
  Form,
  useActionData,
} from "@remix-run/react";
import { postUser, getusers } from "../models/users.server";
import Spinner from "../components/helpers/Spinner";

export function meta({ data }: any) {
  return [
    { title: `Rhythm souls - Register` },
    {
      description: `Registrarse en Rhythm souls`,
    },
  ];
}

export const action = async ({ request }: ActionArgs) => {

  const formData = await request.formData();
  const name = formData.get("name");
  const mail = formData.get("email");
  const password = formData.get("password");
  const exist = formData.get("exist");

  const user = { name, mail, password };
  if (![name, mail, password].includes("")) {
    if (name?.length < 4) {
      return "El nombre es demasiado corto"
    }
    if (exist !== "0") {
      return "Este Email ya existe escoge otro"
    }
    if (password?.length < 6) {
      return "La contraseña es demasiada corta";
    }

    const newUser = await Promise.all([postUser(user)]);
    console.log(newUser);

  }
  return null;
}

export async function loader() {
  const [users] = await Promise.all([getusers()]);

  return users.data;
}

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(0)
  const [error, setError] = useState(false)

  const action = useActionData();
  const users = useLoaderData();

  const navigate = useNavigate();
  const { user }: any = useOutletContext();

  useEffect(() => {
    setLoading(true);

    if (user.length > 0) {
      navigate("/usuario");
    }

    setLoading(false);
  }, []);

  useEffect(() => {

    if (![name, email, password].includes("")) {

      if (users.length > 0) {
        if (name.length < 4) {
          window.alert("El nombre es demasiada corta");
          return;
        }

        for (let index = 0; index < users.length; index++) {
          if (email == users[index].attributes.mail) {
            window.alert("Este Email ya existe escoge otro");
            setExist(1);
            return;
          }
        }
        if (password.length < 6) {
          window.alert("La contraseña es demasiada corta");
          return;
        }
        setExist(0);

        window.alert("La cuenta ha sido creada exitosamente");
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } else {
      setError(true)
      //window.alert("Todos los Campos deben estar llenados")

    }

  }, [action])



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (![name, email, password].includes("")) {

      if (users.length > 0) {
        if (name.length < 4) {
          window.alert("El nombre es demasiada corta");
          return;
        }

        for (let index = 0; index < users.length; index++) {
          if (email == users[index].attributes.mail) {
            window.alert("Este Email ya existe escoge otro");
            setExist(1);
            return;
          }
        }
        if (password.length < 6) {
          window.alert("La contraseña es demasiada corta");
          return;
        }
        setExist(0);


        navigate("/login");


      } else {

        navigate("/login");

      }

    } else {

      window.alert("Todos los Campos deben estar llenados")

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
          <h2 className="heading">Register</h2>
          <Form method="POST" className="container" >

            <div>
              <div>Nombre:</div>

              <input
                id="name"
                name="name"
                type="text"
                className="centered-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div>Correo:</div>

              <input
                id="email"
                name="email"
                type="email"
                className="centered-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div>Contraseña:</div>

              <input
                id="password"
                name="password"
                type="password"
                className="centered-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="number" name="exist" value={exist} hidden />
            {error && <>
              <p className="error">Todos los Campos deben estar llenados</p>
            </>}
            <button type="submit" className="centered-button">
              Registrate
            </button>


            <div>
              <Link className="button-styled" to={`/login`}>
                ¿Ya tienes Cuenta? Inicia sesion Ahora...
              </Link>
            </div>
          </Form>
        </>
      )}
    </>
  );
};

export default register;
