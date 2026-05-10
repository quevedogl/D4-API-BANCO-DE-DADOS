"use client";

import { useState } from "react";
import Header from "@/components/navegation/Header";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [produto, setProduto] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");

  const servicos = [
  {
    nome: "Assistência Técnica",
    imagem: "/apoio-tecnico-servico-ao-cliente-tecnologia-de-negocios-conceito-de-internet_628331-410.webp",
    nota: "4.6",
  },
  {
    nome: "Ajuda nois",
    imagem: "/depositphotos_11440894-stock-photo-technical-service-isolated-3d-image.webp",
    nota: "4.5",
  },
  {
    nome: "Bom de brique",
    imagem: "/technician-repairing-air-conditioner.webp",
    nota: "4.7",
  },
  {
    nome: "Sabe das coisas",
    imagem: "/tecnico.webp",
    nota: "4.4",
  },
  {
    nome: "Tamo Junto",
    imagem: "/young-couple-in-shopping.webp",
    nota: "4.8",
  },
  {
    nome: "Quevedo",
    imagem: "/ventilation-system-installation-and-repair-service-hvac-technician-at-work-banner-copy-space.webp",
    nota: "4.6",
  },
  {
    nome: "Beiço",
    imagem: "/8038630_stock-vector-technical-support-operator-vector-illustration.webp",
    nota: "4.5",
  },
  {
    nome: "Smigol",
    imagem: "/depositphotos_426747874-stock-photo-business-technology-internet-network-concept.webp",
    nota: "4.7",
  },
];

  function handleSubmit() {
    if (!produto) {
      setErro("Informe o produto!");
      return;
    }

    if (!marca) {
      setErro("Informe a marca!");
      return;
    }

    if (!estado) {
      setErro("Selecione o estado do produto!");
      return;
    }

    setErro("");
    setOpen(false);

    setProduto("");
    setMarca("");
    setModelo("");
    setEstado("");
  }

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* BUSCA */}
        <input
          placeholder="Buscar serviços..."
          className="w-full p-4 rounded-lg bg-white border border-gray-300 text-gray-900 mb-10 shadow-sm"
        />

        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Destaques
        </h2>

        {/* GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          
          {servicos.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpen(true)}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={item.imagem}
                className="w-full h-48 object-cover rounded-t-xl"
                alt={item.nome}
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.nome}
                </h3>
                <p className="text-sm text-gray-500">
                  ⭐ {item.nota}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Solicitar Serviço
            </h2>

            <div className="flex flex-col gap-3">
              
              <input
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                placeholder="Produto (ex: Geladeira)"
                className="w-full p-3 rounded-lg bg-gray-200 text-black"
              />

              <input
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Marca (ex: Brastemp)"
                className="w-full p-3 rounded-lg bg-gray-200 text-black"
              />

              <input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Modelo (opcional)"
                className="w-full p-3 rounded-lg bg-gray-200 text-black"
              />

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 text-black"
              >
                <option value="">Estado do produto</option>
                <option>Funcionando com defeito</option>
                <option>Não está funcionando</option>
              </select>

              {erro && (
                <p className="text-red-500 text-sm">
                  {erro}
                </p>
              )}

              <button
                onClick={handleSubmit}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg cursor-pointer"
              >
                Enviar Solicitação
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}