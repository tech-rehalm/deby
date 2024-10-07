import { Bed, Contact, ForkKnife, HotelIcon, LocateIcon, Lock, SquareChevronUpIcon, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-full min-h-screen md:h-screen relative '>
        <img src="/bg.webp" alt="" className='absolute w-full h-full object-cover z-0'/>
        <div className=" w-full h-full flex flex-col items-center pt-[60px]   z-20 ">
        <div className=" w-full h-full flex flex-col items-center p-5 pt-[60px]  bg-[#0000009b] z-20  ">
           <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold mb-3 md:mb-6 inset-4">Deby Hotel</h1>
           <div className="flex flex-col md:flex-row w-full justify-center">
            <div className="flex flex-col p-2">
                <div className="flex items-center p-2 cursor-pointer transition duration:500 hover:scale-110"><User className='w-[50px] h-[50px] border border-gray-500 rounded-full text-gray-400 backdrop-blur-md p-3 mr-3'/>Team work</div>
                <div className="flex items-center p-2 cursor-pointer transition duration:500 hover:scale-110"><HotelIcon className='w-[50px] h-[50px] border border-gray-500 rounded-full text-gray-400 backdrop-blur-md p-3 mr-3'/>Accurate Services</div>
                <div className="flex items-center p-2 cursor-pointer transition duration:500 hover:scale-110"><Lock className='w-[50px] h-[50px] border border-gray-500 rounded-full text-gray-400 backdrop-blur-md p-3 mr-3'/>Privacy Policy</div>
                <div className="flex items-center p-2 cursor-pointer transition duration:500 hover:scale-110"><LocateIcon className='w-[50px] h-[50px] border border-gray-500 rounded-full text-gray-400 backdrop-blur-md p-3 mr-3'/>New Square Bridge Sandton</div>
                <div className="flex items-center p-2 cursor-pointer transition duration:500 hover:scale-110"><Contact className='w-[50px] h-[50px] border border-gray-500 rounded-full text-gray-400 backdrop-blur-md p-3 mr-3'/>customersupport@debyhotel.com</div>
            </div>
            <div className="p-5 border border-gray-400 rounded-xl shadow-inner shadow-gray-400 backdrop-blur-sm w-full md:w-[60%] text-center flex flex-col gap-3 items-center justify-center">
                <p className="w-full text-sm text-gray-300 font-extralight text-start">We understand the importance of your privacy and are committed to protecting your personal information. Our privacy policy is designed to ensure that all data collected, whether during your booking process or throughout your stay, is handled securely and confidentially, in compliance with global privacy standards. We implement advanced security measures to protect your sensitive information and never share it with third parties without your explicit consent. Additionally, we prioritize risk management and are fully insured to cover unforeseen events, ensuring that your stay remains enjoyable and stress-free.</p>
                <div className="w-full flex flex-col sm:flex-row gap-3">
                <Link href="/rooms" className="h-full flex flex-col text-center w-full items-center justify-center border border-gray-400 shadow-inner shadow-gray-400 rounded-lg opacity-70 p-5"><Bed/><p>Accommodation</p></Link> 
                 <Link href="/rooms" className="h-full flex flex-col text-center w-full items-center justify-center border border-gray-400 shadow-inner shadow-gray-400 rounded-lg opacity-70 p-5"><ForkKnife/><p>Food</p></Link>
                 <Link href="/rooms" className="h-full flex flex-col text-center w-full items-center justify-center border border-gray-400 shadow-inner shadow-gray-400 rounded-lg opacity-70 p-5"><SquareChevronUpIcon/><p>Security</p></Link>
                </div>
            </div>
           </div>
           </div>
        </div>
    </div>
  )
}
