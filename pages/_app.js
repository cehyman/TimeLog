import React from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css';
import SideMenu from '../components/sidemenu';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function AppContent({ Component, pageProps }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    // Check if running on client and loading is complete
    if (typeof window !== 'undefined' && status !== 'loading') {
      // Redirect to login if not authenticated and not already on the login page
      if (!session && router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [session, status, router]);

  // Check if the current path is not the login page
  const showSideMenu = router.pathname !== '/login';

   // Extract user role from session
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
