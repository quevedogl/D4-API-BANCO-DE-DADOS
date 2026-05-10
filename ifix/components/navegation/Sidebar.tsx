"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-60 bg-gray-100 h-full p-4">
      <ul className="flex flex-col gap-4">
        <li onClick={() => router.push("/home")} className="cursor-pointer">
          Home
        </li>

        <li onClick={() => router.push("/perfil")} className="cursor-pointer">
          Perfil
        </li>

        <li onClick={() => router.push("/pedidos")} className="cursor-pointer">
          Pedidos
        </li>
      </ul>
    </div>
  );
}