import { useEffect, useState } from 'react'
import MovieListItem from './MovieListItem'
import Loader from './Loader'

export default function MovieList({ list, userList, updateMovies }) {

  return (
    <>
      <ul className="list-group">
        {list ?
        <>
         {list.results.map((movie, index) => {
           let exists = true;
           if (!userList || userList.indexOf(movie.id) === -1) {
             exists = false
           }
           return <MovieListItem movieData={movie} exists={exists} key={index} updateMovies={updateMovies}/>
         })}
         </>
        :
         null}
      </ul>
    </>
  )
}