'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loading from '../loading'

type User = {
  _id: string
  name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'loading') return <Loading/>
      if (!session || !session.user) {
        router.push('/signin')
        return
      }

      try {
        const response = await fetch(`/api/users/${session.user._id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [session, status, router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUpdateSuccess(false)
    const formData = new FormData(event.currentTarget)
    const updatedUserData = Object.fromEntries(formData.entries())

    try {
      if (!user) throw new Error('No user data')
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      })

      if (!response.ok) {
        throw new Error('Failed to update user data')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      setUpdateSuccess(true)
    } catch (err) {
      setError('Failed to update user data')
    }
  }

  if (status === 'loading' || loading) return <Loading/>
  if (error) return <div className="text-center p-8 text-error">{error}</div>
  if (!user) return <div className="text-center p-8">User not found</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
      
      <div className="card bg-gray-900 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Current Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-control gap-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <input 
              type="text" 
              id="name"
              name="name" 
              defaultValue={user.name}
              className="input input-bordered bg-gray-800 input-success" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              id="email"
              name="email" 
              defaultValue={user.email}
              className="input input-bordered bg-gray-800 input-success" 
              required 
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-success">Update Profile</button>
        </div>
      </form>

      {updateSuccess && (
        <div className="alert alert-success mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Profile updated successfully!</span>
        </div>
      )}
    </div>
  )
}