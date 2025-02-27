import React from 'react'
import Image from 'next/image'
import feedback from '@/assets/images/feedback.png'

const Feedback = () => {
  return (
  <section className="bg-black relative flex flex-wrap lg:h-screen lg:items-center">
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl text-purple1">We want to hear from you !</h1>

        <p className="mt-4 text-gray-500">
        We value your input! As a potential member of the ORION community, your feedback will be instrumental 
        in refining our product. Share your experiences and suggestions to help us enhance the ORION experience 
        before the official launch.

        </p>
      </div>
      <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>

          <div className="relative">
            <input
              type="email"
              className="w-full rounded-lg bg-transparent border-2 border-gray-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="textarea" className="sr-only">Message</label>
          <div className="relative">
            <textarea
              id="textarea"
              className="w-full rounded-lg bg-transparent border-2 border-gray-700 p-4 pe-12 text-sm shadow-sm text-gray-400"
              placeholder="Your Message"
            ></textarea>
          </div>
        </div>

        {/* <div>
          <label htmlFor="password" className="sr-only">Password</label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg bg-transparent border-2 border-gray-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div> */}

        <div className='mt-5 flex items-center justify-center'>
          <button className="mt-5 p-[3px] relative ">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <a href="">Submit</a> 
            </div>
          </button> 
        </div>
      </form>
    </div>
    <div className="h-64 w-full sm:h-96 lg:h-full lg:w-1/2 pt-20">
        <Image src={feedback} alt="feedback" className=''/>
    </div>
  </section>
  )
}

export default Feedback