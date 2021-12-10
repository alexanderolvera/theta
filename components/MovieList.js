import MovieListItem from './MovieListItem'

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