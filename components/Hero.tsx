import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <div className='w-full h-[70vh] md:h-screen flex items-center justify-center relative overflow-hidden'>
        <img src="hotelfront.jpg" alt="" className="absolute w-full h-full object-cover z-[0]" />
        <div className="z-10 w-full h-full flex flex-col items-center bg-[#090909c1] justify-center">
            <div className="label text-xl text-success">Welcome to</div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl  font-extrabold opacity-75">Deby Hotel</h1>
            <div className="w-full m-5 text-sm font-extralight sm:w-[70%] lg:w-[60%] p-1 border border-gray-800 bg-gray-900 rounded-md flex">
                <Link href="/rooms" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border  border-gray-800 text-center p-2">Bedrooms</Link>
                <Link href="/rooms" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border mx-1 border-gray-800 text-center p-2">Bedrooms</Link>
                <Link href="/rooms" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border mr-1 border-gray-800 text-center p-2">Bedrooms</Link>
                <Link href="/rooms" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border  border-gray-800 text-center p-2">Bedrooms</Link>
            </div>
            <p className="label text-center w-[80%] text-sm md:text-lg">We provide all accomodation services including bedrooms, honeymoon suites, gazebo , bussiness meeting rooms, family houses, pool side wedding venues and more</p>
            <div className="my-4 p-2">
                <Link href="/#services" className="btn btn-success">Explore Our Services</Link>
            </div>
        </div>
        
    </div>
  )
}
