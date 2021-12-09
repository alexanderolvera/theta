import axios from 'axios'

export default function getMovieDetails(movieId) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {Authorization: `Bearer ${process.env.API_KEY}`}
      })
      resolve(response.data)
    } catch(error) {
      reject(error)
    }
  })
}