import { useState } from "react";
import {
  Form,
  useNavigate,
  useOutletContext,
  useActionData,
} from "@remix-run/react";
import { putUser } from "../models/users.server";
import { ActionArgs, ActionFunction } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const id = formData.get("id");

  const user = { name, password };
  if (name?.length < 4) {
    return "El nombre es demasiado corto"
  }
  if (password?.length < 6) {

    return "La contraseña es demasiada corta"
  }
  const newUser = await Promise.all([putUser(id, user)]);
  return "Actualizado Correctamente"



}

const Edit = () => {
  const { user, login }: any = useOutletContext();

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);

  const action = useActionData();

  const handleClick = (e: any) => {
    e.preventDefault();

    if (name?.length < 4) {
      window.alert("El nombre es demasiado corto")
      return null;
    }
    if (password?.length < 6) {
      window.alert("La contraseña es demasiada corta")
      return null;

    }

    window.alert("La cuenta fue actualizada Correctamente")
    const newUser = { id: user.id, mail: user.mail, name, password }
    login(newUser)
  }

  return (
    <>
      <h2 className="heading">Editar Usuario</h2>
      <Form method="PUT" className="container">
        <div>
          <div>Nombre:</div>

          <input id="name" name="name" type="text" className="centered-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div>Contraseña:</div>

          <input
            id="password"
            name="password"
            type="password"
            className="centered-input"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="text" name="id" id="id" hidden value={user.id} />
        <button onClick={handleClick} type="submit" className="centered-button">
          Actualizar
        </button>
      </Form>
    </>
  );
};

export default Edit;
