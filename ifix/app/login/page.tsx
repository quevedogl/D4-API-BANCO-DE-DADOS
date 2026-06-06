"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function validarEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<{ email?: string; senha?: string; geral?: string }>({});
  const [loading, setLoading] = useState(false);

  function validar() {
    const e: typeof erros = {};
    if (!email) e.email = "Informe o e-mail";
    else if (!validarEmail(email)) e.email = "E-mail inválido";
    if (!senha) e.senha = "Informe a senha";
    else if (senha.length < 6) e.senha = "Senha deve ter pelo menos 6 caracteres";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function handleLogin() {
    if (!validar()) return;
    setLoading(true);
    setErros({});
    try {
      const res = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });
      const data = await res.json();
      if (!res.ok) { setErros({ geral: data.message || "Credenciais inválidas." }); return; }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);
      document.cookie = `token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `role=${data.role}; path=/; max-age=${7 * 24 * 60 * 60}`;

      router.push(data.role === "company" ? "/empresa-home" : "/home");
    } catch {
      setErros({ geral: "Erro de conexão com o servidor." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-cyan-500 py-8 flex flex-col items-center">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-2 shadow">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-white text-2xl font-bold tracking-wide">IFix</span>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <div>
            <input type="email" placeholder="Usuário (e-mail)" value={email} onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400 ${erros.email ? "ring-2 ring-red-400" : ""}`} />
            {erros.email && <p className="text-red-500 text-xs mt-1">{erros.email}</p>}
          </div>
          <div>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
              className={`w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400 ${erros.senha ? "ring-2 ring-red-400" : ""}`} />
            {erros.senha && <p className="text-red-500 text-xs mt-1">{erros.senha}</p>}
          </div>
          {erros.geral && <p className="text-red-500 text-sm text-center">{erros.geral}</p>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button onClick={() => router.push("/recuperar-senha")} className="text-gray-500 text-sm text-center hover:underline">Esqueci minha senha</button>
          <button onClick={() => router.push("/cadastro")} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition">Cadastre-se</button>
          <button onClick={() => router.push("/empresa")} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition">Cadastrar Empresa</button>
        </div>
        <div className="bg-cyan-500 py-3 text-center text-white font-bold text-lg">IFix</div>
      </div>
    </div>
  );
}
