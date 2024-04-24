import React from 'react'
import LoginForm from '@/components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <main className="flex h-screen">
        <div className="w-1/2 flex justify-center items-center">
            <LoginForm />
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

export default LoginPage
