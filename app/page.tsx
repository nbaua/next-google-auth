'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

import React from 'react'



function page() {

  const userSignedIn = false;

  const provider: any = null;
  //const [userSignedIn, setUserSignedIn] = useState(false)
  const [authProviders, setAuthProviders] = useState(provider)

  const { data: session } = useSession();

  useEffect(() => {
    const setProviders = async () => {
      //console.log('loading... Providers')
      const response = await getProviders();
      console.log('loaded... Providers')
      console.log(response)
      setAuthProviders(response);
    }
    setProviders();
  }, [])

  function handleGoogleSignIn(_provider: any) {
    // console.log(_provider)
    const response = signIn(_provider.id);
    console.log(response)
  }

  return (
    <main className={styles.main}>
      <img src={session != null ? session?.user?.image : 'login.svg'} alt='Please Login' className={styles.authIcon} />
      <h1>Welcome {session != null ? session?.user?.name : 'Guest'} !</h1>
      {
        session?.user ? (
          <button className={styles.unauthButton} onClick={() => signOut} type='button'>Sign Out From Google</button>
        ) :
          (authProviders && Object.values(authProviders).map((provider: any) => (
            <button className={styles.authButton} onClick={() => handleGoogleSignIn(provider)} type='button' key={provider.name}>Sign In With {provider.name}</button>
          )))
      }
    </main>
  )
}

export default page