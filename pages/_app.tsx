// pages/_app.tsx

import React from 'react';
import '../styles/globals.css'; // Assuming you have global styles
import SidebarMenu from '../components/sidebar'; // Import your SidebarMenu component
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="appLayout">
      <SidebarMenu />
      <div className="mainContent">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
