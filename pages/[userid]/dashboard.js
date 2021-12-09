import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../lib/context"
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../lib/firebase'

import getMovieDetails from "../../lib/getMovieDetails";

import Loader from '../../components/Loader'
import MovieList from '../../components/MovieList'
import MovieSearch from "../../components/MovieSearch"
import axios from "axios";

export default function Dashboard() {

  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('movie-list-tab')
  const [movieIds, setMovieIds] = useState([])
  const [movies, setMovies] = useState(null)

  const getMovieIds = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (user) {
          let docRef = doc(db, 'user-movie-lists', user.uid)
          let docSnap = await getDoc(docRef);
          let data = docSnap.data()
          resolve(data.movies)
        }
        resolve([])
      } catch (error) {
        reject(error)
      }
    })
  }

  const getMovieData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (movieIds && movieIds.length > 0) {
          let response = await axios.get('/api/movie', {
            params: { movieIds: JSON.stringify(movieIds) }
          })
          resolve(response.data)
        }
        resolve(null)
      } catch (error) {
        reject(error)
      }
    })
  }

  const updateMovies = (newIds) => {
    setMovieIds(newIds)
    getMovieData()
  }

  useEffect(() => {
    getMovieIds()
      .then(ids => {setMovieIds(ids)})
  }, [user])

  useEffect(() => {
    getMovieData()
      .then(details => {
        if (details) {
          setMovies({results: details})
        }
      })
  }, [movieIds])

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
              {activeTab === "movie-list-tab" ? <MovieList list={movies} userList={movieIds} updateMovies={updateMovies} /> : <MovieSearch userList={movieIds} updateMovies={updateMovies} />}
            </div>
          </>
        )
      }

    </div>
  )
}