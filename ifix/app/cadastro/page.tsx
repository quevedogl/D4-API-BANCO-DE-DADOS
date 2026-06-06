"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarCPF(cpf: string) {
  return cpf.replace(/\D/g, "").length === 11;
}

export default function CadastroCliente() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", email: "", cpf: "", senha: "", confirmar: "" });
  const [erros, setErros] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErros((e) => ({ ...e, [field]: "" }));
  }

  function validar() {
    const e: Record<string, string> = {};
    if (!form.nome || form.nome.length < 2) e.nome = "Nome deve ter pelo menos 2 caracteres";
    if (!form.email) e.email = "Informe o e-mail";
    else if (!validarEmail(form.email)) e.email = "E-mail inválido";
    if (!form.cpf) e.cpf = "Informe o CPF";
    else if (!validarCPF(form.cpf)) e.cpf = "CPF deve ter 11 dígitos";
    if (!form.senha) e.senha = "Informe a senha";
    else if (form.senha.length < 6) e.senha = "Senha deve ter pelo menos 6 caracteres";
    if (!form.confirmar) e.confirmar = "Confirme a senha";
    else if (form.senha !== form.confirmar) e.confirmar = "As senhas não coincidem";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function handleCadastro() {
    if (!validar()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3003/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nome, email: form.email, password: form.senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErros({ geral: data.message || "Erro ao cadastrar." });
        return;
      }

      router.push("/login");
    } catch {
      setErros({ geral: "Erro de conexão com o servidor." });
    } finally {
      setLoading(false);
    }
  }

  const campo = (field: keyof typeof form, placeholder: string, type = "text") => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={(e) => set(field, e.target.value)}
        className={`w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400 ${erros[field] ? "ring-2 ring-red-400" : ""}`}
      />
      {erros[field] && <p className="text-red-500 text-xs mt-1">{erros[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="bg-cyan-500 py-4 px-4 flex items-center justify-between">
          <button onClick={() => router.push("/login")} className="text-white">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white font-bold text-lg tracking-widest">CADASTRO</span>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="flex flex-col items-center py-5">
          <div className="bg-cyan-500 rounded-full w-16 h-16 flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
          {campo("nome", "Nome Completo")}
          {campo("email", "e-mail", "email")}
          {campo("cpf", "CPF")}
          {campo("senha", "Senha", "password")}
          {campo("confirmar", "Confirmar senha", "password")}

          {erros.geral && <p className="text-red-500 text-sm text-center">{erros.geral}</p>}

          <button
            onClick={handleCadastro}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition mt-1"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>

        <div className="bg-cyan-500 py-3 text-center text-white font-bold text-lg">IFix</div>
      </div>
    </div>
  );
}
