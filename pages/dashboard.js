import { useContext, useState } from "react"
import { UserContext } from "../lib/context"
import Loader from '../components/Loader'
import MovieList from '../components/MovieList'
import MovieSearch from "../components/MovieSearch"

export default function Dashboard() {

  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('movie-list-tab')

  const handlePageChange = (e) => {
    e.preventDefault()
    setActiveTab(e.target.id)
  }

  return (
    <>
      <h1> Dashboard </h1>
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
              {activeTab === "movie-list-tab" ? <MovieList /> : <MovieSearch />}
            </div>
          </>
        )
      }

    </>
  )
}