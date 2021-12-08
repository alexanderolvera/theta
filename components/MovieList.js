import { useEffect, useState } from 'react'
import MovieListItem from './MovieListItem'
import Loader from './Loader'

export default function MovieList({ list }) {

  return (
    <>
      <ul className="list-group">
        {list ?
        <>
         {list.results.map((movie, index) => (<MovieListItem movieData={movie} key={index}/>))}
         </>
        :
         null}
      </ul>
    </>
  )
}