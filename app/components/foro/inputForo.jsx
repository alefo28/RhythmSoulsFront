import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postPublicaciones } from "../../models/publicacions.serve";
import { useOutletContext } from "@remix-run/react";

function PublicacionForo() {
  const { user } = useOutletContext();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error("User no está definido");
      return;
    }

    if (postTitle.trim() && postContent.trim()) {
      const data = {
        author: user.name,
        title: postTitle,
        content: postContent,
        date: new Date().toISOString(),
        url: uuidv4(),
        comments: [],
        user_api: user.id,
      };
      try {
        await Promise.all([postPublicaciones(data)]);
      } catch (error) {
        console.log("----", error);
      }

      window.alert("Publicacio Exitosa!");
      setPostContent("");
      setPostTitle("");
    }
  };

  return (
    <div className="publicacion-foro">
      <label htmlFor="title">Título de la publicación:</label>
      <input
        type="text"
        id="title"
        value={postTitle}
        onChange={handleTitleChange}
        placeholder="Escribe el título de tu publicación"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <label htmlFor="post">Escribe tu publicación:</label>
      <textarea
        id="post"
        value={postContent}
        onChange={handleContentChange}
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
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "var(--black)",
          color: "var(--white)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Publicar
      </button>
    </div>
  );
}

export default PublicacionForo;
