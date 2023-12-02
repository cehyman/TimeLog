// _app.js

import '../styles/global.css'; // Import global styles
import { AppProvider } from '../context/AppContext'; // Import your context provider if you have one

function MyApp({ Component, pageProps }) {
  // You can wrap your entire app with context providers or layout components here
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
