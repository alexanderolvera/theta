import getMovieDetails from "../../lib/getMovieDetails"

export default async function handler(req, res) {
  let movieIds = JSON.parse(req.query.movieIds)
  try {
    let promises = []
    for (var id of movieIds) {
      promises.push(getMovieDetails(id))
    }
    let data = await Promise.all(promises)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}