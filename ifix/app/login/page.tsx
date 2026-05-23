"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/navegation/Header";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email) { setErro("Informe o seu email!"); return; }
    if (!senha) { setErro("Informe a senha!"); return; }

    setErro("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || "Credenciais inválidas.");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/home");
    } catch {
      setErro("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-gray-700 mt-2">
          Não tem conta?
          <a href="/cadastro" className="text-cyan-500 ml-1 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
