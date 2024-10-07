"use client"

import { User } from '@/types/types'
import React, { useEffect, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async()=>{
        const response = await fetch("/api/users")
        const data = await response.json()
        setUsers(data)
        
    }
    useEffect(()=>{
        fetchUsers()
    },[])
    console.log(users);
  return (
    <div className='w-full h-full'>
        {users?.map((user)=>(
            <h1 key={user._id} className="text-xl">{user.name}text</h1>
        ))}
    </div>
  )
}
