import axios from 'axios'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { db } from '../lib/firebase'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'

export default function MovieListItem({ movieData, exists, updateMovies}) {

  const {user} = useContext(UserContext)

  const handleAddMovie = async (e) => {
    e.preventDefault()
    let movie_id = movieData.id

    try {
      const docRef = doc(db, 'user-movie-lists', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data()
        console.log(data.movies)
        if (data.movies.indexOf(movie_id) === -1) {
          let newMovieArray = [movie_id, ...data.movies]
          console.log(newMovieArray)
          await updateDoc(docRef, {
            movies: newMovieArray
          })
          updateMovies(newMovieArray)
        } else {
          toast.error('Movie already in list...')
          throw new Error('Movie already in list')
        }
      } else {
        await setDoc(doc(db, "user-movie-lists", user.uid), {
          movies: [movie_id]
        })
        updateMovies([movie_id])
      }
      toast.success('Movie added to list! :)')
    } catch (error) {
      console.log(error)
      toast.error('Error adding movie. Try again later. :(')
    }
  }

  const handleRemoveMovie = async (e) => {
    e.preventDefault()
    let movie_id = movieData.id
    try {
      const docRef = doc(db, 'user-movie-lists', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data()
        let movieIdIndex = data.movies.indexOf(movie_id)
        if (movieIdIndex !== -1) {
          data.movies.splice(movieIdIndex, 1)
          await updateDoc(docRef, {
            movies: data.movies
          })
          updateMovies(data.movies)
        }
      }
      toast.success('Successfully removed movie :)')
    } catch (error) {
      console.log(error)
      toast.error('Error removing movie. :(')
    }
  }

  return (
    <li className="list-group-item">
      <div className="d-flex flex-row">
        <img className="me-1 rounded" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} height="200px"></img>
        <div className="details d-flex flex-column me-2">
          <h1 className="me-auto">{movieData.title}</h1>
          <p>{movieData.overview}</p>
          {user &&
            exists ?
              <button className="btn btn-warning btn-sm remove-button" onClick={handleRemoveMovie}>Remove-</button>
            :
              <button className="btn btn-primary btn-sm add-button" onClick={handleAddMovie}>Add+</button>
          }
        </div>
      </div>
    </li>
  )
}