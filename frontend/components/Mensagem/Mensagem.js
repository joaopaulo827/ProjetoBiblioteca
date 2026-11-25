import styles from "./Mensagem.module.css";
 
export default function Mensagem({ tipo = "info", children }) {
  if (!children) return null;
  return (
    <p
      className={`${styles.mensagem} ${styles[tipo]}`}
      role={tipo === "erro" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}