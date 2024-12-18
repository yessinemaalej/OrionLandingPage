import React from 'react'
import Stats from '@/components/Stats'


const Waitlist = () => {
  return (
  <section className="bg-black text-white">
    <Stats/>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="mx-auto text-center">
    <h2 className="text-3xl font-bold sm:text-4xl text-gray-200">Join the Waitlist Program </h2>
      <p className="mt-4 text-gray-400 py-3">
      Secure your spot within our main launch waitlist for ORION, a groundbreaking
      device that combines the power of blockchain with renewable energy. <br /> 
      Gain early access to a resilient and sustainable technology designed to operate anywhere, 
      from urban centers to the most remote locations.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple1/10 hover:shadow-purple1/10"
        href="#"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-purple1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-white">Resilience</h2>
        <p className="mt-1 text-sm text-gray-300">
        Designed for Extreme Conditions: Orion is engineered to function reliably in severe conditions,
        including natural disasters and power failures, thanks to its satellite connectivity and rugged design.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple1/10 hover:shadow-purple1/10"
        href="#"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-purple1">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>


        <h2 className="mt-4 text-xl font-bold text-white">Sustainable Power Integration</h2>

        <p className="mt-1 text-sm text-gray-300">
        Eco-Friendly Operation: Orion harnesses solar energy to power its operations, 
        significantly reducing carbon emissions and ensuring efficient energy use even during low-light periods.

        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple1/10 hover:shadow-purple1/10"
        href="#"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-purple1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
</svg>


        <h2 className="mt-4 text-xl font-bold text-white">Global Connectivity</h2>

        <p className="mt-1 text-sm text-gray-300">
        Comprehensive Coverage: Orion utilizes Starlink&apos;s satellite network to provide continuous
        connectivity in remote and underserved areas, ensuring global reach and decentralization for the Dione blockchain.

        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple1/10 hover:shadow-purple1/10"
        href="#"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-purple1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-white">High-Security Measures</h2>

        <p className="mt-1 text-sm text-gray-300">
        Advanced Data Protection: Orion employs sophisticated encryption and authentication
        protocols to safeguard data integrity and prevent unauthorized access, 
        maintaining the security and reliability of the Dione blockchain.
        </p>
      </a>
     
    </div>
    <div className='mt-5 flex items-center justify-center'>
        <button className="mt-5 p-[3px] relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          <a href="https://yu773y9kayu.typeform.com/to/NYY4zLRl?utm_source=xxxxx&utm_medium=xxxxx&utm_campaign=xxxxx&utm_term=xxxxx&utm_content=xxxxx">Join the Waitlist Program</a>           </div>
        </button> 
    </div>
    
  </div>
</section>
  )
}

export default Waitlist