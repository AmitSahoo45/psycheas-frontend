import React, { useContext, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { ContextStore } from '@/constants/context/context';

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { setUser } = useContext(ContextStore)
    const router = useRouter()

    const SignIn = async () => {
        try {
            if (userDetails.email === '' || userDetails.password === '')
                return toast.error('Please fill all the fields')

            const { data: { result, token } } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`, userDetails)

            setUser({
                isPresent: true,
                name: result.name,
                email: result.email,
                uid: result.id,
                jwtToken: token
            })

            localStorage.setItem('psycheas', JSON.stringify({
                isPresent: true,
                name: result.name,
                email: result.email,
                uid: result.id,
                jwtToken: token
            }))

            toast.success('Logged In Successfully')
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const SignUp = async () => {
        try {
            if (userDetails.name === '' || userDetails.email === '' || userDetails.password === '' || userDetails.confirmPassword === '')
                return toast.error('Please fill all the fields')

            if (userDetails.password !== userDetails.confirmPassword)
                return toast.error('Passwords do not match')

            const { data: { result, token } } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, userDetails)

            setUser({
                isPresent: true,
                name: result.name,
                email: result.email,
                uid: result.id,
                jwtToken: token
            })

            localStorage.setItem('psycheas', JSON.stringify({
                isPresent: true,
                name: result.name,
                email: result.email,
                uid: result.id,
                jwtToken: token
            }))

            toast.success('Logged In Successfully')
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center mb-5'>
            <div className="p-4 shadow-md dp06 mt-5 w-4/5">
                <h1 className='text-2xl tracking-wide my-5 '>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignIn && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border-2 border-gray-300 p-4 rounded-lg outline-none focus:border-green-500 text-black"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                    </div>
                )}

                <div className="relative mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg outline-none focus:border-green-500 text-black"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                </div>

                <div className="relative mt-5">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg outline-none focus:border-green-500 text-black"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                </div>

                {!isSignIn && (
                    <div className="relative mt-5">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border-2 border-gray-300 p-4 rounded-lg outline-none focus:border-green-500 text-black"
                            value={userDetails.confirmPassword}
                            onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                        />
                    </div>
                )}

                <div className='flex justify-center items-center mt-5'>
                    <p>{isSignIn ? 'Dont have an account?' : 'Already have an account?'}</p>&nbsp;
                    <button onClick={() => setIsSignIn(!isSignIn)} className='text-green-500'>
                        {isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>


                <div className='flex justify-center'>
                    {isSignIn ?
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded my-4"
                            onClick={SignIn}
                        >
                            Sign In
                        </button> :
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded my-4"
                            onClick={SignUp}
                        >
                            Sign Up
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Authentication