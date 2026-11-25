import styles from "./Carregando.module.css";

export default function Carregando({ texto = "Carregando..." }) {
  return (
    <div className={styles.carregando} role="status">
      <span className={styles.bolinha} />
      {texto}
    </div>
  );
}
