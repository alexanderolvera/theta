import { useEffect, useState } from 'react'
import MovieListItem from './MovieListItem'
import Loader from './Loader'

export default function MovieList({ list, userList }) {

  console.log("movieList: ", list)

  return (
    <>
      <ul className="list-group">
        {list ?
        <>
         {list.map((movie, index) => {
           let exists = false;
           console.log(userList)
           if (userList.indexOf(movie.id) !== -1) {
             exists = true
           }
           return <MovieListItem movieData={movie} exists={exists} key={index}/>
         })}
         </>
        :
         null}
      </ul>
    </>
  )
}