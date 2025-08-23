import React, { useState } from 'react'

const Register = () => {
  const [role, setRole] = useState("USER");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  async function handleRegister() {
    // Validações básicas
    if (!name || !email || !cpf || !password || !confirmPassword) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (role === "ADMIN" && !adminPassword) {
      alert("É necessário informar a senha de Admin!");
      return;
    }

    // Monta os dados
    const userData = {
      name,
      email,
      cpf,
      password,
      role,
      adminPassword: role === "ADMIN" ? adminPassword : null
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert("Conta cadastrada com sucesso!");
        // Redirecionar para login
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        alert("Erro: " + (errorData.message || "Não foi possível registrar"));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }
}

export default Register
