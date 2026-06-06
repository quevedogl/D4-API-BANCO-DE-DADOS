"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Solicitacao {
  id: string;
  product: string;
  brand: string;
  model?: string;
  condition: string;
  status: string;
  createdAt: string;
  company: { name: string; specialty?: string };
}

const statusLabel: Record<string, { label: string; color: string }> = {
  pending:    { label: "Pendente",   color: "bg-yellow-100 text-yellow-700" },
  accepted:   { label: "Aceito",     color: "bg-blue-100 text-blue-700" },
  inProgress: { label: "Em andamento", color: "bg-purple-100 text-purple-700" },
  completed:  { label: "Concluído",  color: "bg-green-100 text-green-700" },
  cancelled:  { label: "Cancelado",  color: "bg-red-100 text-red-700" },
};

export default function Historico() {
  const router = useRouter();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    fetch("http://localhost:3003/requests/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setSolicitacoes(Array.isArray(data) ? data : []))
      .catch(() => setSolicitacoes([]))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-cyan-500 py-4 px-4 flex items-center gap-3">
        <button onClick={() => router.push("/home/perfil")} className="text-white">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-white font-bold text-lg">Histórico de Solicitações</span>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 flex flex-col gap-3 pb-20">
        {loading && <p className="text-center text-gray-500 mt-10">Carregando...</p>}

        {!loading && solicitacoes.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400 mt-6">
            <p className="text-lg mb-2">Nenhuma solicitação ainda</p>
            <p className="text-sm">Clique em uma empresa na home para solicitar um serviço.</p>
            <button onClick={() => router.push("/home")}
              className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition text-sm">
              Ir para Home
            </button>
          </div>
        )}

        {solicitacoes.map((s) => {
          const st = statusLabel[s.status] ?? { label: s.status, color: "bg-gray-100 text-gray-600" };
          return (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{s.company.name}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${st.color}`}>{st.label}</span>
              </div>
              <div className="text-sm text-gray-600 flex flex-col gap-1">
                <span><b>Produto:</b> {s.product} — {s.brand}</span>
                {s.model && <span><b>Modelo:</b> {s.model}</span>}
                <span><b>Estado:</b> {s.condition}</span>
                <span><b>Data:</b> {new Date(s.createdAt).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
