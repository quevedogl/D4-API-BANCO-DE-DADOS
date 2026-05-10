"use client";

import { useState } from "react";
import Header from "@/components/navegation/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    if (!email) {
      setErro("Informe o seu email!");
      return;
    }
    if (!senha) {
      setErro("Informe a senha!");
      return;
    }
    setErro("");
    alert("Login realizado com sucesso!");
    setEmail("");
    setSenha("");
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">IFix</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none text-black"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none text-black"
        />

        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}