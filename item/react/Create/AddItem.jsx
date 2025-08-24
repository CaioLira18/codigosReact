import React, { useState } from 'react';

const AddItem = () => {
    const [name, setName] = useState("");

    const API_URL = "http://localhost:8080/api";

    function addItem() {
        if (!name.trim()) {
            alert("Preencha os campos obrigatórios.");
            return;
        }

        const payload = {
            name,
            /* Outros Atriburtos */

        };

        fetch(`${API_URL}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao adicionar.");
                }
                return response.json();
            })
            .then(() => {
                alert("Adicionado com sucesso!");
                setName("");
                {/* Outros Atributos */}
            })
            .catch(error => {
                console.error(error);
                alert("Erro ao adicionar.");
            });
    }

    return (
        <div>
            <div className="containerItem">
                <div className="boxItem">
                    <h1>Adicionar Item</h1>

                    {/* Nome */}
                    <div className="inputBox">
                        <div className="textLogo">
                            <i className="fa-solid fa-pencil"></i>
                            <h2>Name</h2>
                        </div>
                        <div className="inputArea">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </div>
                    </div>

                    {/* Outros Atributos */}

                    <div className="addItemButton">
                        <button onClick={addItem}>Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItem;
