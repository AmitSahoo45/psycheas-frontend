import { ContextStore } from '@/constants/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AdminPanel = () => {
    const [userData, setUserData] = useState()
    const { user } = useContext(ContextStore)

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storyline/solved/all`)
            console.log(data)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserData()
    }, [user]);

    return (
        <div>
            <button
                onClick={getUserData}
            >
                getUserData
            </button>
        </div>
    )
}

export default AdminPanel