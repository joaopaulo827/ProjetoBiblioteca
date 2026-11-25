"use client";
 
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Mensagem from "@/components/Mensagem/Mensagem";
import ModalConfirmacao from "@/components/ModalConfirmacao/ModalConfirmacao";
import { useSessao } from "@/lib/sessao";
import { livros } from "@/dados/exemplo";
import styles from "./detalhe.module.css";
 

export default function DetalheLivro() {
  const { id } = useParams();
  const router = useRouter();
  const { usuario } = useSessao();
  const [confirmando, setConfirmando] = useState(false);
 
  const livro = livros.find((r) => r.id === Number(id));
 
  if (!livro) {
    return (
      <>
        <Mensagem tipo="erro">Livro não encontrada.</Mensagem>
        <Link href="/">Voltar para a lista</Link>
      </>
    );
  }
 
  const excluir = () => {
    setConfirmando(false);
    router.push("/");
  };
 
  return (
    <article className={styles.detalhe}>
      <span className={styles.genero}>{livro.genero}</span>
      <h1>{livro.titulo}</h1>
      <p className={styles.info}>
        {livro.autor} Autor · {livro.ano} Ano
      </p>
      <p>{livro.disponivel}</p>
 
      <div className={styles.acoes}>
        <Botao variante="secundario" type="button" onClick={() => router.back()}>
          ← Voltar
        </Botao>
        {usuario && (
          <>
            <Link href={`/livros/${livro.id}/editar`} className={styles.editar}>
              Editar
            </Link>
            <Botao variante="perigo" type="button" onClick={() => setConfirmando(true)}>
              Excluir
            </Botao>
          </>
        )}
      </div>
 
      <ModalConfirmacao
        aberto={confirmando}
        titulo="Excluir livro?"
        aoConfirmar={excluir}
        aoCancelar={() => setConfirmando(false)}
      >
        <p>&quot;{livro.titulo}&quot; vai ser apagada. Não dá para desfazer.</p>
      </ModalConfirmacao>
    </article>
  );
}