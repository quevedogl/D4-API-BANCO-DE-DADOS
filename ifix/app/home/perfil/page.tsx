"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PerfilCliente() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-cyan-500 py-4 px-4 flex items-center gap-3">
        <button onClick={() => router.push("/home")} className="text-white">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-white font-bold text-lg">Perfil</span>
      </div>

      <div className="max-w-sm mx-auto mt-6 px-4 flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-500" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name ?? "..."}</h2>
          <p className="text-gray-500 text-sm">{user?.email ?? "..."}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Informações</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between"><span>Nome:</span><span className="font-medium text-gray-800">{user?.name}</span></div>
            <div className="flex justify-between"><span>E-mail:</span><span className="font-medium text-gray-800">{user?.email}</span></div>
            <div className="flex justify-between"><span>Tipo:</span><span className="font-medium text-cyan-600">Cliente</span></div>
          </div>
        </div>

        <button onClick={() => router.push("/home/historico")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition">
          Ver Histórico de Solicitações
        </button>

        <button onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition">
          Sair
        </button>
      </div>
    </div>
  );
}
