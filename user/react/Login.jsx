import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api";

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Validação básica
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      console.log("Tentando login com:", { email, password: "***" });
      
      const response = await Axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Resposta do servidor:", response.data);

      if (response.data) {
        const userData = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          cpf: response.data.cpf,
          role: (response.data.role || "USER").toUpperCase(),
          token: response.data.token,
          authenticated: true,
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        setSuccess("Login realizado com sucesso!");
        
        // Aguarda um pouco antes de navegar para mostrar a mensagem
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error("Erro completo:", error);
      
      if (error.code === "ERR_NETWORK") {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      } else if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        
        const message = typeof error.response.data === 'string' 
          ? error.response.data 
          : error.response.data?.message || 
            error.response.data?.error || 
            "Credenciais inválidas";
        setError(message);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
}

export default Login