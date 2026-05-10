"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/navegation/Header";

export default function Page() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col items-center gap-6 text-center">
        
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo ao IFix
        </h1>

        <p className="text-gray-600">
          Encontre assistência técnica de forma rápida e fácil.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
          
          <button
            onClick={() => router.push("/login")}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/cadastro")}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg cursor-pointer"
          >
            Cadastro Cliente
          </button>

        </div>

        <button
          onClick={() => router.push("/empresa")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg cursor-pointer"
        >
          Cadastro Empresa
        </button>

        <button
          onClick={() => router.push("/home")}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg cursor-pointer"
        >
          Ir para Home
        </button>

      </div>
    </div>
  );
}