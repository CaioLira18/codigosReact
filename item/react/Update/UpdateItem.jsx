import React, { useState } from "react";

const UpdateProduct = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const API_URL = "http://localhost:8080/api";

  function updateItem() {
    if (!id.trim() || !name.trim()) {
      alert("Preencha ID e Nome.");
      return;
    }

    const payload = {
      name,
      /* outros atributos se necessário */
    };

    fetch(`${API_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar.");
        }
        return response.json();
      })
      .then(() => {
        alert("Item atualizado com sucesso!");
        setId("");
        setName("");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao atualizar.");
      });
  }

  return (
    <div className="containerItem">
      <div className="boxItem">
        <h1>Atualizar Item</h1>

        {/* ID */}
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

        {/* Nome */}
        <div className="inputBox">
          <div className="textLogo">
            <i className="fa-solid fa-pencil"></i>
            <h2>Name</h2>
          </div>
          <div className="inputArea">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
        </div>

        {/* Outros Atributos */}

        <div className="addItemButton">
          <button onClick={updateItem}>Atualizar</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
