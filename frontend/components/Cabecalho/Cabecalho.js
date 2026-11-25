"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSessao, sair } from "@/lib/sessao";
import styles from "./Cabecalho.module.css";

const LINKS = [
  { href: "/", texto: "Livros" },
  { href: "/livros/novo", texto: "Novo Livros" },
];

export default function Cabecalho() {
  const caminho = usePathname();
  const router = useRouter();
  const { usuario } = useSessao();

  const fazerLogout = () => {
    sair();
    router.push("/");
  };

  return (
    <header className={styles.cabecalho}>
      <Link href="/" className={styles.marca}>
        Biblioteca
      </Link>
      <nav className={styles.menu}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={caminho === link.href ? styles.ativo : styles.link}
          >
            {link.texto}
          </Link>
        ))}
        {usuario ? (
          <button type="button" className="botao-secundario" onClick={fazerLogout}>
            Sair ({usuario.nome})
          </button>
        ) : (
          <Link href="/login" className={styles.link}>
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}