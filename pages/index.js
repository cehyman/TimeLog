// pages/index.js

import React from 'react';
import Head from 'next/head';
import styles from '../styles/home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>TimeLog - Dashboard</title>
        <meta name="description" content="Dashboard for tracking your time efficiently with TimeLog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to TimeLog</h1>
        <p className={styles.description}>Track your time efficiently with TimeLog</p>
      </main>
    </div>
  );
}

export default Home;
