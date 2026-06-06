"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarSenha() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [codigo, setCodigo] = useState(["", "", "", "", ""]);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleStep1() {
    if (!email) { setErro("Informe seu e-mail!"); return; }
    if (!confirmaEmail) { setErro("Confirme seu e-mail!"); return; }
    if (email !== confirmaEmail) { setErro("Os e-mails não coincidem!"); return; }
    setErro("");
    setStep(2);
  }

  function handleStep2() {
    if (codigo.some((d) => d === "")) { setErro("Preencha todos os dígitos do código!"); return; }
    setErro("");
    setStep(3);
  }

  function handleStep3() {
    if (!novaSenha) { setErro("Informe a nova senha!"); return; }
    if (!confirmaSenha) { setErro("Confirme a nova senha!"); return; }
    if (novaSenha !== confirmaSenha) { setErro("As senhas não coincidem!"); return; }
    setErro("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1000);
  }

  function handleCodigo(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;
    const novo = [...codigo];
    novo[index] = value;
    setCodigo(novo);
    if (value && index < 4) {
      document.getElementById(`digit-${index + 1}`)?.focus();
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-cyan-500 py-4 px-4 flex items-center justify-between">
          <button onClick={() => step === 1 ? router.push("/login") : setStep(step - 1)} className="text-white">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white font-bold text-lg">Recuperar Senha</span>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="px-6 py-8 flex flex-col gap-4">

          {/* Passo 1 — Informar e-mail */}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                placeholder="Confirma e-mail"
                value={confirmaEmail}
                onChange={(e) => setConfirmaEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
              <button
                onClick={handleStep1}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Confirmar
              </button>
              <p className="text-gray-500 text-sm text-center">
                Enviaremos um código de recuperação para seu e-mail
              </p>
            </>
          )}

          {/* Passo 2 — Inserir código */}
          {step === 2 && (
            <>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-3 rounded-lg bg-gray-100 text-gray-400 outline-none"
              />
              <button
                disabled
                className="w-full bg-gray-200 text-gray-400 font-semibold py-3 rounded-lg"
              >
                Confirmar
              </button>

              <p className="text-gray-600 text-sm text-center mt-2">
                Escreva o código enviado
              </p>

              <div className="flex justify-center gap-2">
                {codigo.map((d, i) => (
                  <input
                    key={i}
                    id={`digit-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleCodigo(e.target.value, i)}
                    className="w-11 h-11 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-cyan-500 outline-none"
                  />
                ))}
              </div>

              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

              <button
                onClick={handleStep2}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Confirmar
              </button>

              <button
                onClick={() => setCodigo(["", "", "", "", ""])}
                className="text-cyan-500 text-sm text-center hover:underline"
              >
                Reenviar código
              </button>
            </>
          )}

          {/* Passo 3 — Nova senha */}
          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
              <button
                onClick={handleStep3}
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? "Salvando..." : "Confirmar"}
              </button>
            </>
          )}

        </div>

        {/* Rodapé */}
        <div className="bg-cyan-500 py-3 text-center text-white font-bold text-lg">
          IFix
        </div>
      </div>
    </div>
  );
}
