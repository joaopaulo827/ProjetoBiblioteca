"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Campo from "@/components/Campo/Campo";
import Botao from "@/components/Botao/Botao";
import Mensagem from "@/components/Mensagem/Mensagem";
import { entrar } from "@/lib/sessao";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const enviar = (event) => {
    event.preventDefault();
    if (email.trim() === "" || senha === "") {
      setErro("Preencha e-mail e senha.");
      return;
    }
    entrar("token-de-teste", email.split("@")[0]);
    router.replace("/");
  };

  return (
    <form className={styles.login} onSubmit={enviar} noValidate>
      <h1>Entrar</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>
      <Campo
        rotulo="E-mail"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Campo
        rotulo="Senha"
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Botao type="submit">Entrar</Botao>
    </form>
  );
}