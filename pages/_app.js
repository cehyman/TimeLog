import React from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css';
import SideMenu from '../components/sidemenu';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function AppContent({ Component, pageProps }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== 'undefined' && status === 'unauthenticated' && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [status, router]);

  const showSideMenu = router.pathname !== '/login';
  const userRole = session?.user?.role;

  return (
    <div className="appLayout">
      {showSideMenu && <SideMenu userRole={userRole}/>}
      <div className="mainContent">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
