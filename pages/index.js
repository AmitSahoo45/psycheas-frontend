import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux";
import Image from "next/legacy/image"
import { toast } from "react-toastify"

import { getPuzzle, selectWhodunit } from '@/store/puzzleSlice'
import { ContextStore } from "@/constants/context/context"

export default function Home() {
  const { user } = useContext(ContextStore)
  const router = useRouter()

  const dispatch = useDispatch();
  const Puzzle = useSelector(selectWhodunit);

  useEffect(() => {
    if (user.isPresent)
      dispatch(getPuzzle())
  }, [user])

  const PlayNow = async () => {
    if (!user.isPresent) {
      toast.error("Please login to play the game")
      router.push("/login")
      return
    }

    router.push(`/whodunit/${Puzzle._id}`)
  };
  const GoToAdmin = () => {
    if (!user.isPresent) {
      toast.error("Please login to access the admin panel")
      router.push("/login")
      return
    }
    router.push("/admin/login")
  }

  return (
    <section className="w-full">
      <main className="flex min-h-screen items-center justify-between">
        <div className="flex w-full flex-col sm:flex-row pt-4 px-4">
          <div className="flex flex-col w-full sm:w-1/2">
            <div className="w-4/5 mx-auto">
              <Image
                src="/images/detective.png"
                alt="Detective"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-1/2 text-center sm:text-left">
            <h1 className="text-4xl text-green-200 mb-4">Psycheas</h1>
            <p className="whitespace-pre-line leading-7">
              an enigma wrapped in a puzzle, shrouded in mystery, and steeped in intrigue. It's a tantalizing adventure that puts your wits to the test and transports you to a world of detectives and crime scenes. <br />
              But be carefull, there are clues mixed with dead ends.
              <br />
              Test your problem solving, creativity and time management skills now!
            </p>
            <div className="flex flex-col mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-5"
                onClick={PlayNow}
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="w-3/5 mx-auto flex items-center justify-center mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => GoToAdmin()}
        >
          Admin Login
        </button>
      </div>
    </section>
  )
}
