import Head from 'next/head'
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth)

  return (
    <UserContext.Provider value={{ user }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp
