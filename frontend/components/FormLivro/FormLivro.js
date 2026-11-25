"use client";

import { useState } from "react";
import Campo from "@/components/Campo/Campo";
import Botao from "@/components/Botao/Botao";
import Mensagem from "@/components/Mensagem/Mensagem";
import styles from "./FormLivro.module.css";

const VAZIO = { titulo: "", autor: "", ano: "",isbn:"",disponivel: "", genero_id: "", genero: "" };

export default function FormLivro({ generos, LivroInicial = VAZIO, aoSalvar }) {
  const [dados, setDados] = useState(LivroInicial);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  const mudar = (event) => {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  };

  const validar = () => {
    const novos = {};
    if (dados.titulo.trim().length < 3)
      novos.titulo = "O título precisa de pelo menos 3 letras.";
    if (dados.autor.trim() === "") novos.autor = "Informe o autor.";
    if (!dados.ano || Number(dados.ano) < 1500) {
      novos.ano = "Informe um ano válido.";
    }
    if (dados.genero_id === "") novos.genero_id = "Escolha uma Genero.";
    if (dados.isbn==="") novos.isbn="Digite o isbn(10 digitos)"
    return novos;
  };

  const enviar = async (event) => {
    event.preventDefault();
    const novos = validar();
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    setSalvando(true);
    setMensagem("");
    try {
      await aoSalvar(dados);
    } catch (erro) {
      setMensagem(erro.message);
      setSalvando(false);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={enviar} noValidate>
      <Mensagem tipo="erro">{mensagem}</Mensagem>
      <Campo
        rotulo="Título"
        id="titulo"
        name="titulo"
        value={dados.titulo}
        onChange={mudar}
        erro={erros.titulo}
      />
      <div className={styles.linha}>
        <Campo
          rotulo="Autor"
          id="autor"
          name="autor"
          type="autor"
          value={dados.autor}
          onChange={mudar}
          erro={erros.autor}
        />
        <Campo
          rotulo="Ano"
          id="ano"
          name="ano"
          type="number"
          value={dados.ano}
          onChange={mudar}
        />
      </div>
      <Campo
        rotulo="Genero"
        id="genero_id"
        name="genero_id"
        value={dados.genero_id}
        onChange={mudar}
        erro={erros.genero_id}
      >
        <option value="">Escolha...</option>
        {generos.map((generos) => (
          <option key={generos.id} value={generos.id}>
            {generos.genero}
          </option>
        ))}
      </Campo>
      <Campo
        rotulo="Disponível"
        id="disponivel"
        name="disponivel"
        value={dados.disponivel}
        onChange={mudar}
      >
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Campo>
      <Botao type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </Botao>
    </form>
  );
}