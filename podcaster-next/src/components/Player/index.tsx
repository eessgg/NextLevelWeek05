import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Player() {

  return (
    <div className={styles.playerContainer}> 
      <header>
        <img src="/logo.svg" alt="app"/>
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selectione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />            
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Shuffle"/>
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button type="button">
            <img src="/play.svg" alt="Tocar"/>
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  )
}