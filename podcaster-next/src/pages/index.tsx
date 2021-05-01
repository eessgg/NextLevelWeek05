import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { api } from './../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToString } from './../utils/convertDurationToString';
import styles from './home.module.scss';
import { PlayerContext, usePlayer } from './../contexts/PlayerContext';
import { FiCalendar, FiClock } from "react-icons/fi";


type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationString: string;
  url: string;
  publishedAt: string
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcaster</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <div className={styles.btnPlayDetails}>
                  <Image
                    width={250}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                  <button
                    type="button"
                    onClick={() => playList(episodeList, index + latestEpisodes.length)}
                  > <img src="/play-green.svg" alt="play" />
                  </button>
                </div>

                <div className={styles.episodeDetails}>
                  <main>
                    <Link href={`/episodes/${episode.id}`}>
                      {episode.title}
                    </Link>
                    <p>{episode.members}</p>
                  </main>
                  <footer>
                    <p> <span> <FiCalendar /> </span> {episode.publishedAt}</p>
                    <p> <span> <FiClock /> </span> {episode.durationString}</p>
                  </footer>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <h2>Todos Episódios</h2>
      <section className={styles.allEpisodes}>

          {allEpisodes.map((episode, index) => {
            return (
              <div key={episode.id} className={styles.allEpisodesBox}>
                <div className={styles.btnPlayDetails}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                  <button
                    type="button"
                    onClick={() => playList(episodeList, index + allEpisodes.length)}
                  > <img src="/play-green.svg" alt="play" />
                  </button>
                </div>

                <div className={styles.details}>
                  <div  className={styles.details_text}>
                    <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
                    <p> {episode.members} </p>
                  </div>
                  <div  className={styles.details_data}>
                    <p  style={{ width: 100 }}> <span> <FiCalendar /> </span> {episode.publishedAt}</p>
                    <p> <span> <FiClock /> </span> {episode.durationString}</p>
                  </div>
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationString: convertDurationToString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}