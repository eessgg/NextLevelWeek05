import React, { useState } from 'react';  
import styles from '../styles/app.module.scss'
import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>   
        <Header />
        <main className={styles.container}>
         <Player />
          <Component {...pageProps} />
        </main>
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
