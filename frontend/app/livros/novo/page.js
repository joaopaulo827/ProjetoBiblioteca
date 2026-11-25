"use client";
 
import { useRouter } from "next/navigation";
import FormLivro from "@/components/FormLivro/FormLivro";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import { generos } from "@/dados/exemplo";
 
export default function NovoLivro() {
  const router = useRouter();
 
  const salvar = async (dados) => {
    console.log("Salvar:", dados);
    router.push("/");
  };
 
  return (
    <RotaProtegida>
      <h1>Nova Livro</h1>
      <FormLivro generos={generos} aoSalvar={salvar} />
    </RotaProtegida>
  );
}