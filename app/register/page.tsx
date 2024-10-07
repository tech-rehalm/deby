"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit  =async(e:any)=>{
        e.preventDefault()
        try {
            if(password !== confrimPassword){
                toast.error("Passwords do not match")
                return
            }
             const response = await fetch("/api/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })
        console.log(response);
        
           if(response.ok){
            toast.success("Account created")
            router.push("/signin")  
           } else{
            toast.error("Failed to create an account")
           }
         } catch (error) {
            console.log(error);
            toast.error("Failed to create an account")
        }
    }
  return (
    <div className='w-full flex items-center justify-center  p-10 pt-[100px] '>
        <form onSubmit={handleSubmit} className=' form p-4sm:p-7 rounded-xl border border-gray-900 p-3 sm:p-7 flex flex-col sm:w-[350px] bg-gradient-to-br from-[#ffffff0c]'>
            <h1 className="text-3xl font-bold w-full text-center mb-[10px]">Register</h1>
            <label htmlFor="name" className='label'>Name</label>
            <input type="text" value={name} onChange={(e: { target: { value: React.SetStateAction<string> } })=> setName(e.target.value)}  className='input input-success bg-gray-800' />
            <label htmlFor="email" className='label'>Email</label>
            <input type="email" value={email} onChange={(e: { target: { value: React.SetStateAction<string> } })=> setEmail(e.target.value)}  className='input input-success bg-gray-800' />
            <label htmlFor="name" className='label'>Password</label>
            <input type="password" value={password} onChange={(e: { target: { value: React.SetStateAction<string> } })=> setPassword(e.target.value)}  className='input input-success bg-gray-800' />
            <label htmlFor="password" className='password'>Confirm Password</label>
            <input type="password" value={confrimPassword} onChange={(e: { target: { value: React.SetStateAction<string> } })=> setConfirmPassword(e.target.value)}  className='input input-success bg-gray-800' /> 
                <button className='btn btn-success my-2'>Register</button>
                <Link href="/signin" className='text-sm font-extralight'>Already have an accouct? <span className="link link-success">Sign in</span></Link>
        </form>
    </div>
  )
}
