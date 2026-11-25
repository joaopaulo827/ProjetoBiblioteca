import styles from "./Botao.module.css";

export default function Botao({ variante = "principal", children, ...resto }) {
  return (
    <button className={`${styles.botao} ${styles[variante]}`} {...resto}>
      {children}
    </button>
  );
}
