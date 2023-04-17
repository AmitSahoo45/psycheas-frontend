import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import { selectWhodunit, selectSolved, nextQuestion, getPuzzle } from '@/store/puzzleSlice'
import { ContextStore } from '@/constants/context/context'
import Loader from '@/components/Loader/Loader'

const Whodunit = () => {
    const dispatch = useDispatch()
    const whodunit = useSelector(selectWhodunit)
    const solved = useSelector(selectSolved)
    const { user } = useContext(ContextStore)

    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState(0)
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [timer, setTimer] = useState(0)
    const [showSln, setShowSln] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const unsavedChanges = true
    const warningText = 'You have unsaved changes - are you sure you wish to leave this page?'

    const handleOptionClick = optionId => setSelectedOptionId(optionId)

    const CheckAnswer = async () => {
        try {
            setShowSln(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storyline/puzzle/check`, {
                isCorrect: selectedOptionId == whodunit.correct.id,
                qid: whodunit._id,
                time: 300 - counter
            }, { headers: { authorization: `Bearer ${user.jwtToken}` } })

            console.log(data)
            setCounter(0)
            clearInterval(timer)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const NextQuestion = () => {
        dispatch(nextQuestion())
        setShowSln(false)
        setSelectedOptionId(null)
        setLoading(true)
        setCounter(302)
        clearInterval(timer)
        setTimer(setInterval(() => setCounter(counter - 1), 1000))
    }

    useEffect(() => {
        if (solved != null)
            if (whodunit && Object.keys(solved).length > 0)
                setCounter(300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whodunit]);

    useEffect(() => {
        if (counter == 1) {
            CheckAnswer()
        }

        setTimer(counter > 0 && setInterval(() => setCounter(counter - 1), 1000))
        return () => {
            clearInterval(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    useEffect(() => {
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whodunit, solved])

    useEffect(() => {
        if (user.isPresent)
            dispatch(getPuzzle())

        if (localStorage.getItem(`${slug}`) != null)
            setCounter(localStorage.getItem(`${slug}`))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        const handleWindowClose = (e) => {
            if (!unsavedChanges) return
            e.preventDefault()
            return (e.returnValue = warningText)
        }

        const handleBrowseAway = () => {
            if (!unsavedChanges) return
            if (window.confirm(warningText)) return
            router.events.emit('routeChangeError')
            throw 'routeChange aborted.'
        }

        window.addEventListener('beforeunload', handleWindowClose)
        router.events.on('routeChangeStart', handleBrowseAway)
        localStorage.setItem(`${slug}`, counter)
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose)
            router.events.off('routeChangeStart', handleBrowseAway)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unsavedChanges])

    return (
        <>
            <Head>
                <title>{whodunit.title}</title>
            </Head>
            {loading ?
                <div>
                    <Loader />
                </div>
                :
                <section className="w-5/6 mx-auto my-5">
                    <div className="flex justify-between items-center mb-3">
                        <header>
                            <h1 className='text-[2rem] capitalize border-b pb-3'>{whodunit.title}</h1>
                        </header>
                        <div className='flex items-center flex-col space-x-2'>
                            Time Remaining
                            <p>{parseInt(counter / 60) + 'm ' + counter % 60 + 's'}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm leading-6 tracking-wide whitespace-pre-line">{whodunit.storyline}</p>
                    </div>
                    <div className='border-b border-gray-300 pb-3 w-3/5'></div>
                    {!showSln ? (
                        <>
                            <div className="mt-5">
                                <h2 className="text-lg font-medium">Options</h2>
                                <div className="mt-3">
                                    {whodunit.options?.map(option => (
                                        <div
                                            key={option.id}
                                            className={`flex items-center justify-between p-3 rounded-md border-2 my-2 border-gray-300 hover:cursor-pointer ${selectedOptionId === option.id ? 'bg-green-1' : ''}`}
                                            onClick={() => handleOptionClick(option.id)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm">{option.option}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-5"
                                    onClick={() => CheckAnswer()}
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="mt-5">
                            {selectedOptionId === whodunit.correct.id ? (
                                <div className="flex items-center justify-between p-3 rounded-md border-2 my-2 bg-green-500">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">Hurah. {whodunit?.correct?.option} is the correct answer</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 rounded-md border-2 my-2 bg-red-500">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">Oops!! That&apos;s the wrong answer. {whodunit?.correct?.option} is the correct answer</p>
                                    </div>
                                </div>
                            )}
                            <h2 className="text-lg font-medium">Solution</h2>
                            <div className="mt-3">
                                <div className="flex my-2 flex-col">
                                    <div>
                                        {whodunit.explaination}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-5"
                                    onClick={() => NextQuestion()}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            }
        </>
    )
}

export default Whodunit