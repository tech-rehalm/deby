import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Services() {
  return (
    <div id='services' className='w-full md:pt-[60px]   min-h-screen flex flex-col relative overflow-hidden p-4'>
        <div className='w-full min-h-[70vh] bg-gray-200 pt-6 sm:px-[50px]'>
        <h1 className="text-5xl text-success  font-bold w-full text-center mb-5">A little overview of services we offer </h1>
        <div className="flex flex-col sm:flex-row w-full text-gray-700 items-center justify-center shadow-lg p-5 ">
            <div className="min-w-[30%] p-5">
                <img src="/guest.jpg" className='w-full h-[220px] object-cover' alt="" />
            </div> 
            <div className="flex flex-col min-w-[25%] cursor-pointer ">
                <Link href="/accomodation" className=' my-3 transition duration-500 hover:scale-110'>Accomodation</Link>
                <Link href="/accomodation" className=' my-3 transition duration-500 hover:scale-110'>Leisure Center</Link>
                <Link href="/accomodation" className=' my-3 transition duration-500 hover:scale-110'>Resturants</Link>
                <Link href="/accomodation" className=' my-3 transition duration-500 hover:scale-110'>Conferencing</Link>
                <Link href="/accomodation" className=' my-3 transition duration-500 hover:scale-110'>Contact Us now</Link>
            </div>
            <div className="flex min-w-[50%] p-[5%] bg-slate-900 text-gray-200">
                <p className='text-center'>Experience unmatched comfort and luxury. Whether you're here for business or leisure, our team is dedicated to making your stay unforgettable. Relax in our elegant rooms, savor world-class dining, and enjoy personalized service every step of the way. At Deby Hotel, your perfect escape awaits.</p>
            </div>
        </div>
      
    </div>
        <h1 className="text-xl text-center lg:mt-10 my-4 mb-5 md:text-3xl lg:text-5xl font-bold">
            What we offer</h1>
            <div className="w-full rounded-lg shadow-gray-800 shadow-lg  grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4 border border-gray-800 p-3 items-center">
                <div className="card border w-full  border-gray-800 bg-gradient-to-br from-gray-800 p-3">
                    <h1 className="text-lg font-bold text-success">Bedrooms</h1>
                    <img src="/room1.jpg" alt="" className="h-[150px] object-cover rounded-md" />
                    <div className="text-sm my-2 font-extralight">Day and night accomodation</div>
                    <div className="font-bold text-lg text-success">
                        Affordable and luxurious
                    </div>
                    <div className="flex text-warning text-sm font-extralight">
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                    </div>
                    <Link href="/rooms" className='btn w-full btn-success text-sm '>Check available rooms</Link>
                </div>
                <div className="card border w-full  border-gray-800 bg-gradient-to-br from-gray-800 p-3">
                    <h1 className="text-lg font-bold text-success">Boardrooms</h1>
                    <img src="/conf2.webp" alt="" className="h-[150px] object-cover rounded-md" />
                    <div className="text-sm my-2 font-extralight">Professional and conference meetings</div>
                    <div className="font-bold text-lg text-success">
                        All resouces provided
                    </div>
                    <div className="flex text-warning text-sm font-extralight">
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                    </div>
                    <Link href="/rooms" className='btn w-full btn-success text-sm '>Find boardrooms</Link>
                </div>
                <div className="card border w-full  border-gray-800 bg-gradient-to-br from-gray-800 p-3">
                    <h1 className="text-lg font-bold text-success">Honeymoon</h1>
                    <img src="/gaze4.webp" alt="" className="h-[150px] object-cover rounded-md" />
                    <div className="text-sm my-2 font-extralight">Honeymoon suites and gazebos</div>
                    <div className="font-bold text-lg text-success">
                        Book your suite
                    </div>
                    <div className="flex text-warning text-sm font-extralight">
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                    </div>
                    <Link href="/rooms" className='btn w-full btn-success text-sm '>Check available rooms</Link>
                </div>
                <div className="card border w-full  border-gray-800 bg-gradient-to-br from-gray-800 p-3"> 
                    <h1 className="text-lg font-bold text-success">Wedding Venues</h1>
                    <img src="/venue5.jpg" alt="" className="h-[150px] object-cover rounded-md" />
                    <div className="text-sm my-2 font-extralight">Luxurious wedding venues</div>
                    <div className="font-bold text-lg text-success">
                        Check youe theme
                    </div>
                    <div className="flex text-warning text-sm font-extralight">
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                        <Star className='m-1'/>
                    </div>
                    <Link href="/rooms" className='btn w-full btn-success text-sm '>Check available rooms</Link>
                </div>
            </div>
    </div>
  )
}
