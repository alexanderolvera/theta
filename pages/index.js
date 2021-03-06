import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import PopularList from '../components/PopularList'

export async function getStaticProps() {
  let movies = null
  try {
    let response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {Authorization: `Bearer ${process.env.API_KEY}`}
    })
    movies = response.data
  } catch (error) {
    console.log(error)
  }

  return {
    props: {movies},
    revalidate: 36000
  }
}

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marquee</title>
        <meta name="description" content="Personal Movie List in the Cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Marquee
        </h1>

        <p className={styles.description}>
          Your personal movie list in the cloud!{' '}
        </p>
        <br/>
        <PopularList list={movies} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
