import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
  return [
    { title: "Rhythm souls - Sobre Nosotros" },
    { description: "Venta de Instrumentos, Musica, blog de musica y mas" },
  ];
}

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />

        <div>
          <p>
            En Rhythm Souls, vivimos y respiramos música. Nuestra tienda fue
            fundada para todos aquellos que sienten la conexión profunda con
            cada nota y cada melodía, buscando brindar no solo instrumentos de
            calidad, sino también un espacio donde los músicos de todas las
            trayectorias encuentren inspiración y apoyo en su camino.
          </p>
          <p>
            Nos dedicamos a ofrecer una experiencia completa, desde productos
            cuidadosamente seleccionados hasta una comunidad apasionada por la
            música. En Rhythm Souls, creemos que cada instrumento cuenta una
            historia, y queremos ayudarte a encontrar el que hable por ti.
            ¡Únete a nuestra comunidad y déjate llevar por el ritmo que marca tu
            alma!
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
