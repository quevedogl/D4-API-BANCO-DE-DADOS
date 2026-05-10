"use client";

import { useState } from "react";
import Header from "@/components/navegation/Header";

export default function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleCadastro() {
    if (!nome) {
      setErro("Informe seu nome!");
      return;
    }
    if (!email) {
      setErro("Informe seu e-mail!");
      return;
    }
    if (!senha) {
      setErro("Informe a senha!");
      return;
    }
    setErro("");
    alert("Cadastro realizado!");
    setNome("");
    setEmail("");
    setSenha("");
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Cadastro Cliente</h1>

        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-900"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-900"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-900"
        />

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button
          onClick={handleCadastro}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg cursor-pointer transition"
        >
          Cadastrar
        </button>

        <p className="text-center text-gray-700 mt-2">
          Já tem conta? 
          <a href="/login" className="text-cyan-500 ml-1 hover:underline">Entre</a>
        </p>
      </div>
    </div>
  );
}