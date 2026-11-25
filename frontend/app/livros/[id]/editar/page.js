"use client";
 
import { useParams, useRouter } from "next/navigation";
import FormLivro from "@/components/FormLivro/FormLivro";
import RotaProtegida from "@/components/RotaProtegida/RotaProtegida";
import Mensagem from "@/components/Mensagem/Mensagem";
import { livros, generos } from "@/dados/exemplo";
 
export default function EditarLivro() {
  const { id } = useParams();
  const router = useRouter();
  const livro = livros.find((r) => r.id === Number(id));
 
  const salvar = async (dados) => {
    console.log("Atualizar:", id, dados);
    router.push(`/livros/${id}`);
  };
 
  return (
    <RotaProtegida>
      <h1>Editar livro</h1>
      {livro ? (
        <FormLivro
        generos={generos}
          LivroInicial={livro}
          aoSalvar={salvar}
        />
      ) : (
        <Mensagem tipo="erro">Livro não encontrada.</Mensagem>
      )}
    </RotaProtegida>
  );
}