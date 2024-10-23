import { useNavigate, useOutletContext, Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import ListadoPublicaciones from "../components/foro/ListadoPublicaciones";
import { getPublicacionesUser } from "../models/publicacions.serve";
import { PutUsuarioPremium } from "../models/users.serve";

export function meta({ data }) {
  return [
    { title: `Rhythm souls - Usuario` },
    {
      description: `Configuracion de usuario y mas`,
    },
  ];
}

function Usuario() {
  const { user, deleteCarrito, handlePremium } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);

  const { login } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user.mail == undefined) {
      navigate("/login");
    }
    setLoading(false);

    findPublicaciones();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteCarrito();
    login({});
    navigate("/login");
    setLoading(false);
  };

  const findPublicaciones = async () => {
    const publi = await getPublicacionesUser(user.id);

    setPublicaciones(publi.data);
  };

  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {user.id !== undefined && (
            <>
              {" "}
              <h2 className="heading">Perfil</h2>
              <div className="container">
                <h2 className="user-name">{user.name}</h2>
                {/*  <div>{user.mail}</div> */}
                <div className="buttons">
                  {user.premium ? (
                    <p className="premium-text">
                      Ya eres Premium, disfruta de los beneficios
                    </p>
                  ) : (
                    <>
                      <p className="not-premium-text">¿No eres Premium aun?</p>
                      <button
                        onClick={handlePremium}
                        className="premium-button"
                      >
                        Conviértete en Premium
                      </button>
                    </>
                  )}
                </div>
                <div className="buttons">
                  <Link to={"/edit"} className="centered-button">
                    Editar Cuenta
                  </Link>
                  <button onClick={handleClick} className="buttonLogout">
                    Cerrar sesion
                  </button>
                </div>
              </div>
              <h2 className="heading">Tu publicaciones</h2>
              <div className="contenedor">
                <ListadoPublicaciones
                  publicaciones={publicaciones}
                  profile={true}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Usuario;
