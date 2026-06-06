"use client";

import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = [
  { label: "Favoritos", icon: "M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z", href: "/home" },
  { label: "Cupom de Desconto", icon: "M9 14l-4-4m0 0l4-4m-4 4h16M15 10l4 4m0 0l-4 4", href: "/home" },
  { label: "Categorias", icon: "M4 6h16M4 10h16M4 14h16M4 18h16", href: "/home" },
  { label: "Perfil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", href: "/perfil" },
  { label: "Loja", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", href: "/home" },
  { label: "Pedidos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", href: "/home" },
];

const bottom = [
  { label: "Ajuda", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { label: "Feedback", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 text-gray-700 text-left w-full transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t px-4 py-4 flex flex-col gap-1">
          {bottom.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-500 text-left w-full transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Rodapé do sidebar */}
        <div className="bg-cyan-500 py-3 text-center text-white font-bold text-lg">
          IFix
        </div>
      </div>
    </>
  );
}
