"use client"

import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase';

export const context = createContext({
    authUser: null,
    isLoading: true
})

export function useFirebaseAuth(){
  const[authUser, setAuthUser] = useState(null);
  const[isLoading, setIsLoaading] = useState(true);

  const clear = () => {
    setAuthUser(null)
    setIsLoaading(false)
  }

  const authStateChanged = async(user) => {
    setIsLoaading(true)
    if(!user){
      clear()
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName
    })
    setIsLoaading(false)
  };

  const userSignOut = () => {
    signOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return() => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    setAuthUser,
    userSignOut
  }
}

const AuthUserProvider = (props) => {

  const auth = useFirebaseAuth()

  return (
    <context.Provider value={auth}>
        {props.children}
    </context.Provider>
  )
}

export default AuthUserProvider