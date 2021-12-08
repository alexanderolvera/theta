import { useContext, useState } from "react"
import { UserContext } from "../../lib/context"
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../lib/firebase'

import getMovieDetails from "../../lib/getMovieDetails";

import Loader from '../../components/Loader'
import MovieList from '../../components/MovieList'
import MovieSearch from "../../components/MovieSearch"

export async function getServerSideProps({ query, req, res}) {
  const { userid } = query;
  let movieIds = null;
  let movies = { results: null};

  console.log("userid: ", userid)

  try {
    const docRef = doc(db, "user-movie-lists", userid);
    const docSnap = await getDoc(docRef);
    let document = docSnap.data()

    const promises = []
    for (var movieId of document.movies) {
      promises.push(getMovieDetails(movieId))
    }

    movies.results = await Promise.all(promises)

    return {
      props: { movies }
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true
    }
  }

}

export default function Dashboard({ movies }) {

  console.log(movies)

  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('movie-list-tab')

  const handlePageChange = (e) => {
    e.preventDefault()
    setActiveTab(e.target.id)
  }

  return (
    <div className="me-auto">
      {!user ?
        <Loader show />
        :
        (
          <>
            <h3> Welcome {user.displayName}</h3>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a id="movie-list-tab" className={'nav-link' + (activeTab === "movie-list-tab" ? " active" : "") } href="#" onClick={handlePageChange}>Movie List</a>
              </li>
              <li className="nav-item">
                <a id="search-tab" className={'nav-link' + (activeTab === "search-tab" ? " active" : "") } href="#" onClick={handlePageChange}>Search</a>
              </li>
            </ul>
            <div className="page-data">
              {activeTab === "movie-list-tab" ? <MovieList list={movies} /> : <MovieSearch />}
            </div>
          </>
        )
      }

    </div>
  )
}