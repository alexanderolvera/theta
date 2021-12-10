import PopularListItem from "./PopularListItem"

export default function PopularList({ list, userList, updateMovies }) {

  return (
    <>
      <ul className="list-group">
        {list ?
        <>
         {list.results.map((movie, index) => {
           return <PopularListItem movieData={movie} key={index} />
         })}
         </>
        :
         null}
      </ul>
    </>
  )
}