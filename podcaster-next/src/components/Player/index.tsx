import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from './../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState} = useContext(PlayerContext)

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])
  
  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}> 
      <header>
        <img src="/logo.svg" alt="app"/>
        <strong>Tocando agora {episode.title} </strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
          <strong> {episode.title} </strong>
          <span> {episode.members} </span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selectione um podcast para ouvir</strong>
        </div>
      )} 

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#84f361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ backgroundColor: '#9f75ff', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />     
            )}       
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio src={episode.url} autoPlay ref={audioRef} onPlay={() => setPlayingState} />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Shuffle"/>
          </button>
          <button type="button"  disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button type="button" onClick={togglePlay}  disabled={!episode}>
            {isPlaying 
              ? <img src="/play.svg" alt="Tocar"/> 
              : <img src="/pause.svg" alt="Pause"/>
            }
          </button>
          <button type="button"  disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  )
}