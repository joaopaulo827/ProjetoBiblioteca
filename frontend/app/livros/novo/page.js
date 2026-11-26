"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Carregando from "@/components/Carregando/Carregando";
import FormLivro from "@/components/FormLivro/FormLivro";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import { criarLivro, listarGeneros } from "@/lib/banco";
 
export default function NovoLivro() {
  const router = useRouter();
  const [generos, setGeneros] = useState(null);

  useEffect(() => {
    listarGeneros().then((lista) => setGeneros(lista));
  }, []);  

  const salvar = async (dados) => {
    await criarLivro(dados);
    router.push("/");
  };
 
  return (
    <RotaProtegida>
      <h1>Nova Livro</h1>
      {generos ?(
      <FormLivro generos={generos} aoSalvar={salvar} />
    ) : (
        <Carregando />
      )}      
    </RotaProtegida>
  );
}