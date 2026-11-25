import Link from "next/link";
import styles from "./CardLivro.module.css";

export default function CardLivro({ livros }) {
  return (
    <li>
      <Link href={`/livros/${livros.id}`} className={styles.card}>
        <span className={styles.titulo}>{livros.titulo}</span>
        <h2 className={styles.autor}>{livros.autor}</h2>
      </Link>
      <p className={styles.info}>
          {livros.genero}
        </p>              
    </li>
  );
}