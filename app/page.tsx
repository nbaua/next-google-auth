'use client'

import styles from './page.module.css'
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useState, useEffect } from "react";
import React from 'react'

function page() {
  const provider: any = null;
  const [authProviders, setAuthProviders] = useState(provider)

  const { data: session } = useSession();
  const profileImage: any = session?.user?.image;

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setAuthProviders(response);
    }
    setProviders();
  }, [])

  function handleGoogleSignIn(_provider: any) {
    const response = signIn(_provider.id);
  }

  function handleGoogleSignOut() {
    signOut();
  }

  return (
    <main className={styles.main}>
      <img src={session != null ? profileImage : 'login.svg'} alt='Please Login' className={styles.authIcon} />
      <h1>Welcome {session != null ? session?.user?.name : 'Guest'} !</h1>
      {
        session?.user ? (
          <button className={styles.unauthButton} onClick={() => handleGoogleSignOut()} type='button'>Sign Out From Google</button>
        ) :
          (authProviders && Object.values(authProviders).map((provider: any) => (
            <button className={styles.authButton} onClick={() => handleGoogleSignIn(provider)} type='button' key={provider.name}>Sign In With {provider.name}</button>
          )))
      }
    </main>
  )
}

export default page