import { section } from 'framer-motion/client'
import React from 'react'

const Pricing = () => {
  return (
    <section className='bg-black'>
        <div className='text-center text-gray-400'>
            
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-200">Pre-Payment</h2>
            <p className=" text-gray-400 py-4">
                To streamline your involvement, choose our pre-payment option to : <br />
                <span className='font-bold'>Secure Your Spot :</span> Ensure your participation with early access and benefits.
                <br /><span className='font-bold'>Customize Your Payment : </span>Select between paying with DIONE tokens or a different payment method based on your preference.

            </p>
        </div>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            <div className="rounded-2xl border border-gray-600 shadow-sm text">
                <div className="p-6 sm:px-8">
                    <h2 className="text-2xl font-medium text-purple1 text-center">
                    Beta Testers Batch 1
                    <span className="sr-only">Plan</span>
                    </h2>

                    <p className="mt-2 text-gray-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                    <p className="mt-2 sm:mt-4 text-center">
                    <strong className="text-3xl font-bold text-white sm:text-4xl"> --$ </strong>

                    <span className="text-sm font-medium text-gray-500">/month</span>
                    </p>

                </div>

                <div className="p-6 sm:px-8 text-center">
                {/* <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p> */}
                {/* <ul className="mt-2 space-y-2 sm:mt-4 text-center">
                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>

                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>

                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>

                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-red-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>

                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-red-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>

                <li className="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-red-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span className="text-gray-700"> -------- </span>
                </li>
                </ul> */}
                <a
                    className="mt-4 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                    href="#"
                    >
                    Get Started
                </a>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-600 shadow-sm text">
                <div className="p-6 sm:px-8">
                    <h2 className="text-2xl font-medium text-purple1 text-center">
                    Beta Testers Batch 2
                    <span className="sr-only">Plan</span>
                    </h2>

                    <p className="mt-2 text-gray-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                    <p className="mt-2 sm:mt-4 text-center">
                    <strong className="text-3xl font-bold text-white sm:text-4xl"> --$ </strong>

                    <span className="text-sm font-medium text-gray-500">/month</span>
                    </p>

                </div>

                <div className="p-6 sm:px-8 text-center">

                <a
                    className="mt-4 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                    href="#"
                    >
                    Get Started
                </a>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-600 shadow-sm text">
                <div className="p-6 sm:px-8">
                    <h2 className="text-2xl font-medium text-purple1 text-center">
                    Main Launch User
                    <span className="sr-only">Plan</span>
                    </h2>

                    <p className="mt-2 text-gray-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                    <p className="mt-2 sm:mt-4 text-center">
                    <strong className="text-3xl font-bold text-white sm:text-4xl"> --$ </strong>

                    <span className="text-sm font-medium text-gray-500">/month</span>
                    </p>

                </div>

                <div className="p-6 sm:px-8 text-center">
                {/* <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p> */}
                
                <a
                    className="mt-4 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                    href="#"
                    >
                    Get Started
                </a>
                </div>
            </div>
        </div>
    </div>
    </section>
    
  )
}

export default Pricing