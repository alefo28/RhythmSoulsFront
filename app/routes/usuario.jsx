import { useNavigate, useOutletContext, Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import img from "../../public/img/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg";

export function meta({ data }) {
  return [
    { title: `Rhythm souls - Usuario` },
    {
      description: `Configuracion de usuario y mas`,
    },
  ];
}

function Usuario() {
  const { user, deleteCarrito } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const { login } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user.mail == undefined) {
      console.log("entro");
      navigate("/login");
    }
    setLoading(false);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteCarrito();
    login({});
    navigate("/login");
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="heading">Perfil</h2>
          <div className="container">
            <div>
              <img src={img} alt="Carrito de compras " />
            </div>
            <div>{user.name}</div>
            <div>{user.mail}</div>
            <div className="buttons">
              <Link to={"/edit"} className="centered-button">
                Editar Cuenta
              </Link>
              <button onClick={handleClick} className="buttonLogout ">
                Cerrar sesion
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Usuario;
