/* import { useEffect, useState } from "react";
import img from "../../public/img/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg";
import { useOutletContext, useNavigate, Link } from "@remix-run/react";
import Spinner from "../helpers/Spinner";

const Perfil = ({ user }) => {
  const { name, mail } = user[0];
  const [loading, setLoading] = useState(false);

  console.log(user);
  const { login } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (mail == undefined) {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
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
            <div>{name}</div>
            <div>{mail}</div>
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
};

export default Perfil;
 */