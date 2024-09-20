import { useState } from "react";

function PublicacionForo() {
  const [postContent, setPostContent] = useState("");

  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.trim()) {
      console.log("Publicación enviada:", postContent);
    }
  };

  return (
    <div className="publicacion-foro">
      <form onSubmit={handleSubmit}>
        <label htmlFor="post">Escribe tu publicación:</label>
        <textarea
          id="post"
          value={postContent}
          onChange={handleInputChange}
          placeholder="¿Qué te gustaría compartir?"
          rows="5"
          cols="50"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        ></textarea>

        <button
          type="submit"
          className=""
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default PublicacionForo;
