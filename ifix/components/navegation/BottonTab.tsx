"use client";

import { useRouter } from "next/navigation";

export default function BottomTab() {
  const router = useRouter();

  return (
    <div className="flex justify-around bg-cyan-500 p-3 text-white">
      <button onClick={() => router.push("/home")}>🏠</button>
      <button onClick={() => router.push("/pedidos")}>📦</button>
      <button onClick={() => router.push("/perfil")}>👤</button>
    </div>
  );
}