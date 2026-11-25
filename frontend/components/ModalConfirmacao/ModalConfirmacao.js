import Botao from "@/components/Botao/Botao";
import styles from "./ModalConfirmacao.module.css";
 
export default function ModalConfirmacao({
  aberto,
  titulo,
  children,
  aoConfirmar,
  aoCancelar,
}) {
  if (!aberto) return null;
  return (
    <div className={styles.fundo} onClick={aoCancelar}>
      <div
        className={styles.caixa}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className={styles.titulo}>{titulo}</h2>
        <div>{children}</div>
        <div className={styles.acoes}>
          <Botao variante="secundario" type="button" onClick={aoCancelar}>
            Cancelar
          </Botao>
          <Botao variante="perigo" type="button" onClick={aoConfirmar}>
            Confirmar
          </Botao>
        </div>
      </div>
    </div>
  );
}