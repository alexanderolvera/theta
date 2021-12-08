import { useState } from 'react'
import axios from 'axios'
import MovieList from "./MovieList"
import toast from 'react-hot-toast'
import Loader from './Loader'

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState(null)
  const [movieList, setMovieList] = useState(null)
  const [searching, setSearching] = useState(false)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchExecute = async (e) => {
    try {
      setSearching(true)
      let movieData = await axios.get('/api/search', {
        params: { searchQuery }
      })
      setMovieList(movieData.data)
      setSearching(false)
    } catch (error) {
      setSearching(false)
      console.log(error)
      toast.error(`Issue searching for ${searchQuery}`)
    }
  }

  return (
    <>
      <div className="row g-3 align-items-center">
          <div className="col-auto">
            <button className="btn btn-info" onClick={handleSearchExecute}>Search</button>
          </div>
          <div className="col-auto">
            <input type="search" id="search" className="form-control" onChange={handleSearchChange}/>
          </div>
          <Loader show={searching}/>
      </div>
      <div className="search-data">
        {/* pass movie list from api call here */}
        <MovieList list={movieList}/>
      </div>
    </>
  )
}