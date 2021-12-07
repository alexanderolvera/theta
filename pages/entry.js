import { auth } from '../lib/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from '@firebase/auth'
import toast from 'react-hot-toast'
import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { useRouter } from 'next/router'

export default function Entry() {
  const { user } = useContext(UserContext)
  const router = useRouter()

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
        await signInWithPopup(auth, provider)
        toast.success('Successfully logged in with Google.')
        router.push('/dashboard')
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
        toast.success('Successfully signed out.')
      } catch (error) {
        console.log(error)
        toast.error('Error signing you out :(')
      }
    }
    return <button id="sign-out" onClick={handleSignOut}>Sign Out</button>
  }
}