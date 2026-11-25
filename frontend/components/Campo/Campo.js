import styles from "./Campo.module.css";
 
export default function Campo({
  rotulo,
  id,
  erro,
  multilinha = false,
  children,
  ...resto
}) {
  let Tag = "input";
  if (multilinha) Tag = "textarea";
  if (children) Tag = "select";
 
  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{rotulo}</label>
      <Tag
        id={id}
        className={erro ? styles.comErro : styles.entrada}
        aria-invalid={erro ? true : undefined}
        {...resto}
      >
        {children}
      </Tag>
      {erro && <span className={styles.erro}>{erro}</span>}
    </div>
  );
}