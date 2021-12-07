import { useContext } from "react"
import { UserContext } from "../lib/context"
import Loader from '../components/Loader'

export default function Dashboard() {

  const { user } = useContext(UserContext)

  return (
    <>
      <h1> Dashboard </h1>
      {!user ?
        <Loader show />
        :
        <h3> Welcome {user.displayName}</h3>
      }

    </>
  )
}