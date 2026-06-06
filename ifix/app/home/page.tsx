"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

interface Company {
  id: string;
  name: string;
  specialty?: string;
  rating: number;
}

export default function Home() {
  const router = useRouter();
  const [empresas, setEmpresas] = useState<Company[]>([]);
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);
  const [selecionada, setSelecionada] = useState<Company | null>(null);
  const [produto, setProduto] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [estado, setEstado] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [notificacao, setNotificacao] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3003/companies")
      .then((r) => r.json())
      .then((data) => setEmpresas(Array.isArray(data) ? data : []))
      .catch(() => setEmpresas([]));

    const s = io("http://localhost:3003", { transports: ["websocket"] });
    setSocket(s);
    s.on("solicitacaoConfirmada", (data: { mensagem: string }) => {
      setNotificacao(data.mensagem);
      setTimeout(() => setNotificacao(""), 4000);
    });
    return () => { s.disconnect(); };
  }, []);

  const filtradas = empresas.filter((e) =>
    e.name.toLowerCase().includes(busca.toLowerCase()) ||
    (e.specialty ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  function validar() {
    const e: Record<string, string> = {};
    if (!produto) e.produto = "Selecione o produto";
    if (!marca) e.marca = "Selecione a marca";
    if (!estado) e.estado = "Selecione o estado";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validar() || !selecionada) return;
    setEnviando(true);

    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:3003/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ companyId: selecionada.id, product: produto, brand: marca, model: modelo, condition: estado }),
        });
      }
      socket?.emit("solicitarServico", { empresa: selecionada.name, produto, marca, modelo, estado });
    } catch {}

    setOpen(false);
    setProduto(""); setMarca(""); setModelo(""); setEstado(""); setErros({});
    setEnviando(false);
  }

  function handleLogout() {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {notificacao && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">
          {notificacao}
        </div>
      )}

      <div className="bg-white px-4 py-3 shadow-sm flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
        </svg>
        <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar empresas ou especialidade..."
          className="flex-1 outline-none text-gray-700 text-sm" />
        <button onClick={() => router.push("/home/perfil")} className="text-gray-400 hover:text-cyan-500 transition">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
        </button>
      </div>

      <div className="bg-cyan-500 mx-4 mt-4 rounded-xl px-5 py-4 text-white text-center font-semibold text-base shadow">
        Encontre a empresa certa para o seu serviço
      </div>

      <div className="bg-cyan-500 mx-4 mt-4 rounded-lg py-2 text-center">
        <span className="text-white font-bold tracking-widest text-sm uppercase">
          {busca ? `Resultados para "${busca}"` : "Destaques"}
        </span>
      </div>

      {empresas.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">Nenhuma empresa cadastrada ainda.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mt-3 pb-4">
        {filtradas.map((empresa) => (
          <div key={empresa.id} onClick={() => { setSelecionada(empresa); setOpen(true); setErros({}); }}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md cursor-pointer transition">
            <div className="w-full h-28 bg-cyan-100 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
            </div>
            <div className="p-2">
              <p className="font-semibold text-gray-800 text-sm truncate">{empresa.name}</p>
              <p className="text-xs text-gray-400">{empresa.specialty ?? "Geral"}</p>
              <p className="text-xs text-gray-500">★ {empresa.rating.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>

      {open && selecionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Solicitar — {selecionada.name}</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">1. Produto <span className="text-red-400">*</span></p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {["Liquidificador","Geladeira","Lava-Roupas","Microondas","TV","Outro"].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="radio" name="produto" checked={produto === p} onChange={() => { setProduto(p); setErros(e => ({...e, produto:""})); }} className="accent-cyan-500" />{p}
                    </label>
                  ))}
                </div>
                {erros.produto && <p className="text-red-500 text-xs mt-1">{erros.produto}</p>}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">2. Marca <span className="text-red-400">*</span></p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {["Brastemp","Electrolux","Black&Decker","Consul","Mondial","Outro"].map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="radio" name="marca" checked={marca === m} onChange={() => { setMarca(m); setErros(e => ({...e, marca:""})); }} className="accent-cyan-500" />{m}
                    </label>
                  ))}
                </div>
                {erros.marca && <p className="text-red-500 text-xs mt-1">{erros.marca}</p>}
              </div>
              <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="3. Modelo (opcional)"
                className="w-full p-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm outline-none" />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">4. Estado <span className="text-red-400">*</span></p>
                <div className="flex flex-col gap-1 text-sm">
                  {["Funcionando, Com Defeito","Não está funcionando"].map((e) => (
                    <label key={e} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="radio" name="estado" checked={estado === e} onChange={() => { setEstado(e); setErros(er => ({...er, estado:""})); }} className="accent-cyan-500" />{e}
                    </label>
                  ))}
                </div>
                {erros.estado && <p className="text-red-500 text-xs mt-1">{erros.estado}</p>}
              </div>
              <button onClick={handleSubmit} disabled={enviando}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition">
                {enviando ? "Enviando..." : "Enviar Solicitação"}
              </button>
              <button onClick={() => setOpen(false)} className="text-gray-400 text-sm text-center hover:underline">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
