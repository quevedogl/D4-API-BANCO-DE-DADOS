"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ServiceModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        
        <h2 className="text-xl font-bold mb-4">
          Solicitar Serviço
        </h2>

        <div className="flex flex-col gap-3">
          <input placeholder="Produto (ex: Geladeira)" className="input" />
          <input placeholder="Marca (ex: Brastemp)" className="input" />
          <input placeholder="Modelo (opcional)" className="input" />

          <select className="input">
            <option>Estado do produto</option>
            <option>Funcionando com defeito</option>
            <option>Não está funcionando</option>
          </select>

          <button className="bg-cyan-500 text-white py-3 rounded-lg">
            Enviar Solicitação
          </button>

          <button
            onClick={onClose}
            className="text-gray-500 mt-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}