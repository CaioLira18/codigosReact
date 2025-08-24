import React, { useEffect, useState } from "react";

const ReadItems = () => {
  const [items, setItems] = useState([]);

  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar itens.");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => {
        console.error(error);
        alert("Erro ao buscar itens.");
      });
  }, []);

  return (
    <div className="containerItem">
      <div className="boxItem">
        <h1>Lista de Itens</h1>
        <ul>
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id}>
                <strong>{item.id}</strong> - {item.name}
              </li>
            ))
          ) : (
            <p>Nenhum item encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReadItems;
