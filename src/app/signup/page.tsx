import React from 'react'
import SignupForm from '@/components/Signup/Signup';

const SignUpPage = () => {
  return (
    <main className="flex h-screen">
        <div className="w-1/2 flex justify-center items-center">
            <SignupForm />
        </div>
        <div className="w-1/2 bg-[#0f0f16] flex items-center justify-center">
            <img
                className="w-1/4 object-contain"
                src="/login.png"
                alt=""
            />
        </div>
    </main>
)
}

export default SignUpPage
