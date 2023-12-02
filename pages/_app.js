import React from 'react';
import '../styles/globals.css'; // Import global styles
import SideMenu from '../components/sidemenu'; // Import the SideMenu component
import { useRouter } from 'next/router'; // Import useRouter

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current path is not the login page
  const showSideMenu = router.pathname !== '/login'; // Replace '/login' with your login route

  return (
    <div className="appLayout">
      {showSideMenu && <SideMenu />}
      <div className="mainContent">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
