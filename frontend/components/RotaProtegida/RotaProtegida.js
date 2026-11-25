"use client";
 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessao } from "@/lib/sessao";
import Carregando from "@/components/Carregando/Carregando";

export default function RotaProtegida({ children }) {
  const { carregando, usuario } = useSessao();
  const router = useRouter();
 
  useEffect(() => {
    if (!carregando && !usuario) {
      router.replace("/login");
    }
  }, [carregando, usuario, router]);
 
  if (carregando || !usuario) return <Carregando texto="Verificando login..." />;
  return children;
}