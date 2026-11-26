import Link from "next/link";
import styles from "./CardLivro.module.css";

export default function CardLivro({ livros }) {
  return (
    <li>
      <Link href={`/livros/${livros.id}`} className={styles.card}>
        <span className={styles.titulo}>{livros.autor}</span>
        <h2 className={styles.autor}>{livros.titulo}</h2>
        <p className={styles.info}>{livros.isbn}</p>
        <p className={styles.genero}>{livros.genero}</p>
      </Link>
    </li>
  );
}