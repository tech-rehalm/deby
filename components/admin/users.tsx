"use client"

import { User } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react"
import { toast } from 'react-toastify'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/users")
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            })

            if (!response.ok) {
                toast.error("Failed to update user role")
                throw new Error('Failed to update user role')
            }else{
                toast.success("User role updated successfully")
            }

            // Update the user's role in the local state
            setUsers(users.map(user => 
                user._id === userId ? { ...user, role: newRole } : user
            ))
        } catch (error) {
            console.error("Failed to update user role:", error)
        }
    }

    return (
        <div className='min-h-screen bg-base-200 p-6'>
            <h1 className="text-3xl font-bold text-success mb-6">User Management</h1>
            <div className="form-control mb-6">
                <div className="flex">
                    <span className="btn btn-square btn-success">
                        <Search className="h-6 w-6 " />
                    </span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input input-bordered input-success w-full max-w-xs ml-5 mb-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-success"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 shadow-success"
                        >
                            <div className="card-body">
                                <h2 className="card-title text-success">{user.name}</h2>
                                <p className="text-gray-400">ID: {user._id}</p>
                                <p className="text-gray-400">{user.email}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-400 mr-2">Role:</span>
                                    <select
                                        className="select select-bordered select-sm select-success"
                                        value={user.role}
                                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="staff">Staff</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && filteredUsers.length === 0 && (
                <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>No users found.</span>
                </div>
            )}
        </div>
    )
}