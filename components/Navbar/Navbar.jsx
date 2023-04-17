import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'

import { ContextStore } from '../../constants/context/context'

const Navbar = () => {
    const { user, setUser } = useContext(ContextStore);
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("psycheas"));
        if (user) setUser(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const LogOut = () => {
        localStorage.removeItem('psycheas')
        setUser({
            isPresent: false,
            name: '',
            email: '',
            uid: '',
            jwtToken: ''
        })

        toast.success('Logged Out Successfully')
        router.push('/login')
    }

    return (
        <nav className='flex justify-between w-full items-center shadow-sm shadow-slate-600'>
            <Link href="/" className="text-4xl font-bold tracking-tighter text-center ml-8">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    priority={true}
                />
            </Link>
            {user.isPresent ? (
                <Link
                    href="/"
                    className="text-xl tracking-tighter text-center mr-8"
                    onClick={() => LogOut()}
                >
                    Log Out
                </Link>
            ) : (
                <Link href="/login" className="text-2xl font-bold tracking-tighter text-center mr-8">
                    <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded my-4 flex items-center font-light text-lg">
                        <span>Login</span>
                    </button>
                </Link>
            )}
        </nav>
    )
}

export default Navbar