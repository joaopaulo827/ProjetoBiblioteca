"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Carregando from "@/components/Carregando/Carregando";
import Mensagem from "@/components/Mensagem/Mensagem";
import ModalConfirmacao from "@/components/ModalConfirmacao/ModalConfirmacao";
import { buscarLivro, excluirLivro } from "@/lib/banco";
import { useSessao } from "@/lib/sessao";
import styles from "./detalhe.module.css";

export default function DetalheLivro() {
  const { id } = useParams();
  const router = useRouter();
  const { usuario } = useSessao();

  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    buscarLivro(id)
      .then((encontrada) => setLivro(encontrada))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  const excluir = async () => {
    setConfirmando(false);

    try {
      router.push("/");
    } catch (e) {
      setErro(e.message);
    }
  };

  if (carregando) return <Carregando />;

  if (!livro) {
    return (
      <>
        <Mensagem tipo="erro">
          {erro || "Livro não encontrado."}
        </Mensagem>
        <Link href="/">Voltar para a lista</Link>
      </>
    );
  }

  return (
    <article className={styles.detalhe}>
      <Mensagem tipo="erro">{erro}</Mensagem>

      <span className={styles.genero}>{livro.genero}</span>

      <h1>{livro.titulo}</h1>

      <p className={styles.info}>
        {livro.autor} · Autor · {livro.ano} · Ano
        · {livro.isbn} · ISBN
      </p>

      <div className={styles.acoes}>
        <Botao
          variante="secundario"
          type="button"
          onClick={() => router.back()}
        >
          ← Voltar
        </Botao>

        {usuario && (
          <>
            <Link
              href={`/livros/${livro.id}/editar`}
              className={styles.editar}
            >
              Editar
            </Link>

            <Botao
              variante="perigo"
              type="button"
              onClick={() => setConfirmando(true)}
            >
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
        <p>
          "{livro.titulo}" será apagado. Não dá para desfazer.
        </p>
      </ModalConfirmacao>
    </article>
  );
}
