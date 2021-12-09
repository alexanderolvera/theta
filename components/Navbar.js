import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// Top navbar
export default function Navbar() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success('Successfully signed out.')
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error('Error signing you out :(')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href={'/'} passHref>
          <a className="navbar-brand mb-0 h1 border rounded text-white bg-dark">Marquee</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user && (
            <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href={`/${user.uid}/dashboard`}>
                <a className={`nav-link ${router.pathname.includes('dashboard') && 'active'}`} href="#">Dashboard</a>
              </Link>
            </li>
          </ul>
            <ul className="navbar-nav ms-auto">
              <li className="my-auto me-2">
                <button className="btn btn-danger" onClick={handleSignOut}>Log Out</button>
              </li>
              <li>
                <Link href={`/${user.uid}/dashboard`} passHref>
                  <img className="rounded-circle user-avatar" src={user?.photoURL} width="50px" height="50px" />
                </Link>
              </li>
            </ul>
            </>
          )}
          {/* user is not signed OR has not created username */}
          {
            !user && (
              <ul className="navbar-nav ms-auto">
                <li>
                  <Link href="/entry" passHref>
                    <button className="btn btn-primary">Log in</button>
                  </Link>
                </li>
              </ul>
            )
          }
        </div>
      </div>
    </nav >
  );
}