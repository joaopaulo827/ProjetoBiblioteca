
"use client";

import { useState } from "react";
import CardLivro from "@/components/CardLivro/CardLivro";
import FiltroGeneros from "@/components/FiltroGeneros/FiltroGeneros";
import Mensagem from "@/components/Mensagem/Mensagem";
import { livros, generos } from "@/dados/exemplo";
import styles from "./page.module.css";

export default function PaginaInicial() {
  const [generoSelecionado, setGeneroSelecionado] = useState(0);

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
