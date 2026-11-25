import styles from "./FiltroGeneros.module.css";
 
export default function FiltroGeneros({ generos, selecionada, aoMudar }) {
  return (
    <div className={styles.filtro}>
      <button
        type="button"
        className={selecionada === 0 ? styles.ativo : styles.opcao}
        onClick={() => aoMudar(0)}
      >
        Todas
      </button>
      {generos.map((generos) => (
        <button
          key={generos.id}
          type="button"
          className={selecionada === generos.id ? styles.ativo : styles.opcao}
          onClick={() => aoMudar(generos.id)}
        >
          {generos.nome}
        </button>
      ))}
    </div>
  );
}