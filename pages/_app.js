import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Next JS</title>
      <meta name="description" content="Some content here"/>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default MyApp;
