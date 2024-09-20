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
            Donec tincidunt neque at mi fringilla pharetra. Sed dapibus nisl sed
            luctus porttitor. Duis feugiat placerat dui eu rhoncus. Phasellus
            dignissim sem sapien, eget condimentum ex commodo id. Quisque nisi
            velit, fermentum vitae dolor nec, varius feugiat metus. Quisque
            rhoncus urna lorem, a tincidunt lorem eleifend in. Nam lobortis
            felis ac neque vulputate pellentesque. Aliquam a enim iaculis,
            venenatis risus nec, porta augue. Nam quis elit eget odio feugiat
            mattis tristique ac risus.
          </p>
          <p>
            Donec tincidunt neque at mi fringilla pharetra. Sed dapibus nisl sed
            luctus porttitor. Duis feugiat placerat dui eu rhoncus. Phasellus
            dignissim sem sapien, eget condimentum ex commodo id. Quisque nisi
            velit, fermentum vitae dolor nec, varius feugiat metus. Quisque
            rhoncus urna lorem, a tincidunt lorem eleifend in. Nam lobortis
            felis ac neque vulputate pellentesque. Aliquam a enim iaculis,
            venenatis risus nec, porta augue. Nam quis elit eget odio feugiat
            mattis tristique ac risus.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
