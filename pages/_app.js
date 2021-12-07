import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp
