import axios from 'axios'

export default function Search(searchString) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get('https://api.themoviedb.org/4/search/movie', {
        headers: {Authorization: `Bearer ${process.env.API_KEY}`},
        params: { query: searchString }
      })
      resolve(response.data)
    } catch(error) {
      reject(error)
    }
  })
}