import Link from "next/link";
import styles from "./CardLivro.module.css";

export default function CardLivro({ livros }) {
  return (
    <li>
      <Link href={`/livros/${livros.id}`} className={styles.card}>
        <span className={styles.categoria}>{livros.categoria}</span>
        <h2 className={styles.titulo}>{livros.titulo}</h2>
      </Link>        
    </li>
  );
}