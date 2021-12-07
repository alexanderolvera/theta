import { auth } from '../lib/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut } from '@firebase/auth'
import toast from 'react-hot-toast'
import { useState, useContext } from 'react'
import { UserContext } from '../lib/context'
import { useRouter } from 'next/router'

export default function Entry() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  const redirect = () => {
    router.push('/dashboard')
  }

  return (
    <>
      {user ?
        <>{redirect()}</>
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
}