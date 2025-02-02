"use client"

import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { context } from "../../../firebase/auth";
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Link from "next/link";

const provider = new GoogleAuthProvider();
const RegisterForm = () => {

    const {authUser, isLoading, setAuthUser} = useContext(context)

    const router = useRouter()

    useEffect(() => {
        if(!isLoading && authUser){
            router.push("/")
        }
    }, [authUser, isLoading])

    const[username, setUsername] = useState(null);
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);

    const signupHandler = async() => {
        if(!email || !username || !password) return;

        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: username
            })
            setAuthUser({
                uid: user.uid,
                email: user.email,
                username
            })

            // console.log(user);

        }
        catch(error){
            console.log("Error in sighup", error.message);
        }
    };

    const signInWithGoogle = async() => {
        await signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Logged In", result);
        })
        .catch((error) => {
            console.log("Error in sign in with google");
            console.log(error.message);
        })
    }

    return isLoading || (!isLoading && !!authUser) ? (
        <Loader center size="lg"/>
    ) : (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <Link href={"/login"} className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </Link>
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                required
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={signupHandler}
                        >
                            Sign Up
                        </button>
                    </form>

                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;
