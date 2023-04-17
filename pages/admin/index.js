import { ContextStore } from '@/constants/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AdminPanel = () => {
    const [userData, setUserData] = useState()
    const { user } = useContext(ContextStore)

    const getUserData = async () => {
        try {
            const { data: { attemptsByUser } } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storyline/solved/all`)
            setUserData(attemptsByUser)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserData()
    }, [user, useContext]);

    const Play = () => {
        console.log(userData)
        console.log(typeof userData)
    }

    function AverageAccuracy(attempt, key) {
        if (key == 'accuracy') {
            let sum = 0;
            for (let i = 0; i < attempt.length; i++)
                sum += attempt[i].accuracy;
            return (sum / attempt.length).toFixed(2);
        }

        if (key == 'time') {
            let sum = 0;
            for (let i = 0; i < attempt.length; i++)
                sum += attempt[i].timeTaken;
            return (sum / attempt.length).toFixed(2);
        }

        if (key == 'percentile') {
            let sum = 0;
            for (let i = 0; i < attempt.length; i++)
                sum += attempt[i].percentile;
            return (sum / attempt.length).toFixed(2);
        }

        if (key == 'correct') {
            let sum = 0;
            for (let i = 0; i < attempt.length; i++)
                sum += attempt[i].correct;
            return sum;
        }
    }

    return (
        <div className='mx-auto w-full px-2 py-4'>
            <h1 className='text-2xl text-center mb-5'>Admin Panel</h1>
            <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Name
                                        </th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Total Attempts
                                        </th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Average Accuracy
                                        </th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Average Time per Question
                                        </th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Total Correct
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {userData?.map((user) => (
                                        <tr key={user._id}>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    <div className='ml-4'>
                                                        <div className='text-sm font-medium text-gray-900'>{user?.name[0]}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-900'>{user?.attempts.length}</div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                    {AverageAccuracy(user.attempts, 'accuracy')}%
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                {AverageAccuracy(user.attempts, 'time')}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                {AverageAccuracy(user.attempts, 'correct')} / {user.attempts.length}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminPanel