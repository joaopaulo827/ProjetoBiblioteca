"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Carregando from "@/components/Carregando/Carregando";
import FormLivro from "@/components/FormLivro/FormLivro";
import Mensagem from "@/components/Mensagem/Mensagem";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import { atualizarLivro, buscarLivro, listarGeneros } from "@/lib/banco";
 
export default function EditarLivro() {
  const { id } = useParams();
  const router = useRouter();
  const [livro, setLivro] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
 
  useEffect(() => {
    Promise.all([buscarLivro(id), listarGeneros()])
      .then(([encontrada, lista]) => {
        setLivro(encontrada);
        setGeneros(lista);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  const salvar = async (dados) => {
    console.log("Atualizar:", id, dados);
    router.push(`/livros/${id}`);
  };
 
  return (
    <RotaProtegida>
      <h1>Editar livro</h1>
      {carregando && <Carregando />}
      <Mensagem tipo="erro">{erro}</Mensagem>
      {livro && (
        <FormLivro
        generos={generos}
          LivroInicial={livro}
          aoSalvar={salvar}
        />
      )}
    </RotaProtegida>
  );
}