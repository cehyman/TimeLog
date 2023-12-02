// pages/index.tsx or a similar home page component

import React from 'react';
import Head from 'next/head';
import styles from '../styles/home.module.css';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>TimeLog - Home</title>
        <meta name="description" content="Track your time efficiently with TimeLog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to TimeLog</h1>
        {/* Main content */}
      </main>

      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Home;
