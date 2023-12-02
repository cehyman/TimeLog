// pages/_app.js

import React from 'react';
import '../styles/globals.css'; // Import global styles
import SideMenu from '../components/sidemenu'; // Import the SideMenu component

function MyApp({ Component, pageProps }) {
  return (
    <div className="appLayout">
      <SideMenu />
      <div className="mainContent">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
