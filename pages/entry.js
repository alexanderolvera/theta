import { auth } from '../lib/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from '@firebase/auth'
import toast from 'react-hot-toast'
import { useState } from 'react'
export default function Entry() {
  const [user, setUser] = useState(null)

  return (
    <>
      {user ?
        SignOutButton()
        :
        SignInButton()
      }
    </>
  )

  function SignInButton() {
    const handleSignInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        setUser(result.user)
        toast.success('Successfully logged in with Google.')
      } catch (error) {
        console.log(error)
        toast.error('Error logging in. Please try again.')
      }
    }
    return <button id="google-signin" onClick={handleSignInWithGoogle}></button>
  }

  function SignOutButton() {
    const handleSignOut = async () => {
      try {
        await signOut(auth)
        setUser(null)
        toast.success('Successfully signed out.')
      } catch (error) {
        console.log(error)
        toast.error('Error signing you out :(')
      }
    }
    return <button id="sign-out" onClick={handleSignOut}>Sign Out</button>
  }
}