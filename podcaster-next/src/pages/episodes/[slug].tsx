import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next'
import {useRouter} from 'next/router'
import { convertDurationToString } from '../../utils/convertDurationToString';
import { api } from './../../services/api';
import Image  from 'next/image';
import styles from './episode.module.scss'
import Link from 'next/link'
import { usePlayer } from './../../contexts/PlayerContext';
import React from 'react';
import Head from 'next/head';


type Episode = {
  id: string;
  title: string;
  thumbnail:string;
  description:string;
  members: string;
  duration: number;
  durationString:string;
  url: string;
  publishedAt: string
} 

type EpisodeProps = {
  episode: Episode
}

export default function Episode({episode}: EpisodeProps) {
  const {play} = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcaster</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <button type="button">
          <img src="/arrow-left.svg" alt="back"/>
        </button>
        <Image
          width={70}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <Link href="/">
          <button type="button">
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </Link>
      </div>

      <header>
        <h1> {episode.title} </h1>
        <span> {episode.members} </span>
        <span> {episode.publishedAt} </span>
        <span> {episode.durationString} </span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{__html: episode.description}}>
        {episode.description}
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order:'desc'
    }
  });

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug} = ctx.params;
  const {data} = await api.get(`/episodes/${slug}`)

  const episodes = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
    duration: Number(data.file.duration),
    durationString: convertDurationToString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }



  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 24,
  }
}