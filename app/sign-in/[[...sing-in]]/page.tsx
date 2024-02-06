import React from 'react'
import { SignIn } from "@clerk/nextjs";

const SigninPage = () => {
    console.log("here")
    return (
        <div className="min-h-screen flex justify-center items-center">
            <SignIn/>
        </div>
    )
}
export default SigninPage
