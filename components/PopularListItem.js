
export default function MovieListItem({ movieData }) {
  return (
    <li className="list-group-item">
      <div className="d-flex flex-row">
        <img className="me-1 rounded" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} height="200px"></img>
        <div className="details d-flex flex-column me-2">
          <h1 className="me-auto">{movieData.title}</h1>
          <p>{movieData.overview}</p>
        </div>
      </div>
    </li>
  )
}