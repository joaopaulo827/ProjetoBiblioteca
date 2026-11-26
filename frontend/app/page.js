"use client";

import { useEffect, useState } from "react";
import CardLivro from "@/components/CardLivro/CardLivro";
import Carregando from "@/components/Carregando/Carregando";
import FiltroGeneros from "@/components/FiltroGeneros/FiltroGeneros";
import Mensagem from "@/components/Mensagem/Mensagem";
import { listarLivros, listarGeneros } from "@/lib/banco";
import styles from "./page.module.css";

export default function PaginaInicial() {
  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([listarLivros(), listarGeneros()])
      .then(([listarLivros, listarGeneros]) => {
        setLivros(listarLivros);
        setGeneros(listarGeneros);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);
 
  if (carregando) return <Carregando />;
  if (erro) return <Mensagem tipo="erro">{erro}</Mensagem>;

  const visiveis =
    generoSelecionado === 0
      ? livros
      : livros.filter((livro) => livro.genero_id === generoSelecionado);

  return (
    <>
      <h1>Livros</h1>

      <FiltroGeneros
        generos={generos}
        selecionada={generoSelecionado}
        aoMudar={setGeneroSelecionado}
      />

      {visiveis.length === 0 && (
        <Mensagem>Nenhum livro neste gênero.</Mensagem>
      )}

      <ul className={styles.grade}>
        {visiveis.map((livro) => (
          <CardLivro key={livro.id} livros={livro} />
        ))}
      </ul>
    </>
  );
}