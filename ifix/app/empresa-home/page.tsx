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
  user: { name: string; email: string };
}

const statusLabel: Record<string, string> = {
  pending: "Pendente", accepted: "Aceito", inProgress: "Em andamento",
  completed: "Concluído", cancelled: "Cancelado",
};

export default function EmpresaHome() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "company") { router.push("/login"); return; }
    if (stored) setUser(JSON.parse(stored));

    const companyId = stored ? JSON.parse(stored).id : null;
    if (!companyId) return;

    fetch(`http://localhost:3003/requests/company/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setSolicitacoes(Array.isArray(data) ? data : []))
      .catch(() => setSolicitacoes([]))
      .finally(() => setLoading(false));
  }, [router]);

  async function atualizarStatus(id: string, status: string) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3003/requests/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setSolicitacoes((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  }

  function handleLogout() {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    router.push("/login");
  }

  const pendentes = solicitacoes.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-cyan-500 px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-white text-xs opacity-80">Bem-vindo,</p>
          <p className="text-white font-bold text-lg">{user?.name ?? "Empresa"}</p>
        </div>
        <button onClick={handleLogout} className="text-white opacity-80 hover:opacity-100">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 flex flex-col gap-4 pb-8">
        {/* Cards resumo */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-cyan-500">{solicitacoes.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total de pedidos</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">{pendentes}</p>
            <p className="text-gray-500 text-sm mt-1">Pendentes</p>
          </div>
        </div>

        <h2 className="font-bold text-gray-700 text-lg mt-2">Solicitações Recebidas</h2>

        {loading && <p className="text-center text-gray-400">Carregando...</p>}

        {!loading && solicitacoes.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
            <p>Nenhuma solicitação recebida ainda.</p>
            <p className="text-sm mt-1">Quando clientes solicitarem seus serviços, aparecerão aqui.</p>
          </div>
        )}

        {solicitacoes.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-800">{s.user.name}</p>
                <p className="text-xs text-gray-400">{s.user.email}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>

            <div className="text-sm text-gray-600 flex flex-col gap-1">
              <span><b>Produto:</b> {s.product} — {s.brand}</span>
              {s.model && <span><b>Modelo:</b> {s.model}</span>}
              <span><b>Estado:</b> {s.condition}</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {["accepted", "inProgress", "completed", "cancelled"].map((st) => (
                <button key={st}
                  onClick={() => atualizarStatus(s.id, st)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${s.status === st ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {statusLabel[st]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
