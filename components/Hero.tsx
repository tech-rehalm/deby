"use client"

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className='w-full h-[70vh] md:h-screen flex items-center justify-center relative overflow-hidden'>
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute w-full h-full z-[0]"
      >
        <Image src="/hotelfront.jpg" alt="Hotel Front" layout="fill" objectFit="cover" quality={100} />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full h-full flex flex-col items-center bg-[#090909c1] justify-center"
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="label text-xl text-success"
        >
          Welcome to
        </motion.div>
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-extrabold"
        >
          Deby Hotel
        </motion.h1>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full m-5 text-sm font-extralight sm:w-[70%] lg:w-[60%] p-1 border border-gray-800 bg-gray-900 rounded-md flex"
        >
          <Link href="/rooms/#rooms" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border border-gray-800 text-center p-2">Bedrooms</Link>
          <Link href="/rooms/#conference" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border mx-1 border-gray-800 text-center p-2">Meetings</Link>
          <Link href="/rooms/#gazebo" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border mr-1 border-gray-800 text-center p-2">Honeymoon</Link>
          <Link href="/rooms/#venue" className="w-full text-sm font-extralight transition duration-500 hover:scale-110 hover:bg-success hover:text-gray-900 sm:font-bold border border-gray-800 text-center p-2">Weddings</Link>
        </motion.div>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="label text-center w-[80%] text-sm md:text-lg"
        >
          We provide all accommodation services including bedrooms, honeymoon suites, gazebo, business meeting rooms, family houses, pool side wedding venues and more
        </motion.p>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 10 }}
          className="my-4 p-2"
        >
          <Link href="/#services" className="btn btn-success">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              Explore Our Services
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}