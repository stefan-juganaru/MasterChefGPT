import React from 'react'
import { SignUp } from "@clerk/nextjs";

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignUp/>
        </div>
    )
}
export default SignupPage
