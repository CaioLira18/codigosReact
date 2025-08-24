import React, { useState } from "react";

const RemoveItem = () => {
  const [id, setId] = useState("");

  const API_URL = "http://localhost:8080/api";

  function removeItem() {
    if (!id.trim()) {
      alert("Informe o ID para remover.");
      return;
    }

    fetch(`${API_URL}/items/${id}`, {
      method: "PUT", // ou PATCH, depende do backend
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao remover.");
        }
        return response.json();
      })
      .then(() => {
        alert("Item removido (marcado como inativo)!");
        setId("");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao remover.");
      });
  }

  return (
    <div className="containerItem">
      <div className="boxItem">
        <h1>Remover Item</h1>
        <div className="inputBox">
          <div className="textLogo">
            <i className="fa-solid fa-tag"></i>
            <h2>ID</h2>
          </div>
          <div className="inputArea">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className="addItemButton">
          <button onClick={removeItem}>Remover</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItem;
