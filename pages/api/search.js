import Search from "../../lib/movie_search"

export default async function handler(req, res) {
  try {
    let data = await Search(req.query.searchQuery)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}