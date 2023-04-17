import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'admin@gmail.com' && password === 'admin') {
            toast.success('Admin Login Successful');
            router.push('/admin')
        } else
            toast.error('Invalid Credentials');
    };

    return (
        <div className="w-3/5 mx-auto mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                        id="email"
                        type="email"
                        placeholder="Enter Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                        id="password"
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <button
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        type="button"
                        onClick={() => router.push('/admin')}
                    >
                        Recruiter Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin