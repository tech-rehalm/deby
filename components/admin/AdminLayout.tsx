"use client"

import React from 'react'
import {useState} from "react"
import { Menu, Settings, ShoppingBagIcon, User2, UserCheck, X } from 'lucide-react'
import { Hotel } from 'lucide-react'
import {  House } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import {motion} from "framer-motion"
import { useSession } from 'next-auth/react'

export default function AdminNavigation({children}:{children:React.ReactNode}) {
    const [open, setOpen] = useState(false)
    const pathName = usePathname()
   const { data: session } = useSession()
   if(session?.user.role !== "admin"){
    redirect("/")
   }

  return (
    <div className='w-full min-h-screen relative z-40  pt-[60px] '>
        {!open ? (
             <div className=" w-[150px] p-2  fixed z-40 ">
            <button onClick={()=>setOpen(true)} className={`btn btn-success `}>
                <Menu className='text-2xl'/> 
            </button>
        </div>
        ): (
            <div className={` w-[150px] p-2 fixed z-40  ${open && "bg-base-300"}`}>
            <button onClick={()=>setOpen(false)} className={`btn btn-success `}>
                <X className='text-2xl'/> 
            </button>
        </div>
        )}
       
        {open &&
        <motion.div onClick={()=>setOpen(false)} className="fixed  left-0 flex flex-col w-[150px] p-3 pr-0 mt-[60px] bg-base-300 h-full z-40 " 
        initial={{opacity:0}}
        transition={{type:"spring", duration:5 }}
        animate={{opacity:1}}
        >
            <Link href="/admin" className={`w-full  p-1 rounded-l-lg flex  items-center ${pathName === "/admin" && "border border-success border-r-0 bg-gray-800 "}` }>
                 <Hotel className='w-[50px] h-[50px] p-3 text-lg text-success bg-base-200 border-gray-800 border rounded-full'/><span className="text-sm font-extralight pl-1">Admin</span>
            </Link>
            <Link href="/admin/customers" className={`w-full my-2  p-1 rounded-l-lg flex  items-center ${pathName === "/admin/customers" && "border border-success border-r-0 bg-gray-800 "}` }>
                 <User2 className='w-[50px] h-[50px] p-3 text-lg text-success bg-base-200 border-gray-800 border rounded-full'/><span className="text-sm font-extralight pl-1">Customers</span>
            </Link>
            <Link href="/admin/bookings" className={`w-full my-2  p-1 rounded-l-lg flex  items-center ${pathName === "/admin/bookings" && "border border-success border-r-0 bg-gray-800 "}` }>
                 <ShoppingBagIcon className='w-[50px] h-[50px] p-3 text-lg text-success bg-base-200 border-gray-800 border rounded-full'/><span className="text-sm font-extralight pl-1">Bookings</span>
            </Link>
            <Link href="/admin/apartments" className={`w-full my-2  p-1 rounded-l-lg flex  items-center ${pathName === "/admin/apartments" && "border border-success border-r-0 bg-gray-800 "}` }>
                 <House className='w-[50px] h-[50px] p-3 text-lg text-success bg-base-200 border-gray-800 border rounded-full'/><span className="text-sm font-extralight pl-1">Apartments</span>
            </Link>
            <Link href="/profile" className={`w-full my-2  p-1 rounded-l-lg flex  items-center ${pathName === "/admin/profile" && "border border-success border-r-0 bg-gray-800 "}` }>
                 <UserCheck className='w-[50px] h-[50px] p-3 text-lg text-success bg-base-200 border-gray-800 border rounded-full'/><span className="text-sm font-extralight pl-1">Profile</span>
            </Link>
           
        </motion.div>}
      <div className="p-3 sm:p-5 lg:p-10 bg-gray-800 min-h-screen w-full">
        {children}
      </div>
    </div>
  )
}
