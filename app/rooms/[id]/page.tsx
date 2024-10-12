'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Loading from '@/app/loading'
import { useSession } from 'next-auth/react'

interface Room {
  _id: string
  title: string
  taken: boolean
  field: string
  category: string
  description: string
  image: string
  number: number
}

export default function RoomDetailsPage() {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ title: '', description: '', number: 0, image: '' })
  const params = useParams()
  const router = useRouter()
  const id = params.id
  const { data: session } = useSession()
  

  // Simulating current user role, replace with actual user role check
  const currentUserRole = session?.user.role // Assume 'admin' or 'user'

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`/api/apartments/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch room data')
        }
        const data = await response.json()
        setRoom(data)
        // Pre-fill form with existing room data
        setFormData({ title: data.title, description: data.description, number: data.number, image: data.image })
      } catch (err) {
        setError('Error fetching room data')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [id])

  const getPricing = (field: string, category: string) => {
    const prices = {
      Rooms: { Medium: { 12: 60, 24: 110 }, Large: { 12: 80, 24: 130 } },
      Conference: { Medium: { 12: 60, 24: 110 }, Large: { 12: 80, 24: 130 } },
      Venue: { Medium: { 12: 200, 24: 300 }, Large: { 12: 300, 24: 400 } },
      Gazebo: { Medium: { 12: 30, 24: 50 }, Large: { 12: 50, 24: 70 } }
    }

    return prices[field as keyof typeof prices]?.[category as 'Medium' | 'Large'] || { 12: 'N/A', 24: 'N/A' }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/house/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update room data')
      }

      const updatedRoom = await response.json()
      setRoom(updatedRoom)
      toast.success('Room updated successfully')
    } catch (error) {
      console.error('Error updating room:', error)
      toast.error('Failed to update room')
    }
  }

  if (loading) return <Loading/>
  if (error) return <div className="text-center p-4 text-error">{error}</div>
  if (!room) return <div className="text-center p-4">Room not found</div>

  const pricing = getPricing(room.field, room.category)

  return (
    <div className="container mx-auto p-4 pt-[80px]">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src={`${room.image}`} alt={room.title} width={500} height={300} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl text-success">{room.title}</h2>
          <p className="text-lg"><span className="font-bold">Category:</span> {room.category}</p>
          <p className="text-lg"><span className="font-bold">Field:</span> {room.field}</p>
          <p className="text-lg"><span className="font-bold">Room Number:</span> {room.number}</p>
          <p className="text-lg"><span className="font-bold">Status:</span> {room.taken ? 'Occupied' : 'Available'}</p>
          <div className="divider"></div>
          <p className="text-lg font-bold text-success">Description:</p>
          <p>{room.description}</p>
          <div className="divider"></div>
          <div className="pricing">
            <p className="text-lg font-bold text-success">Pricing:</p>
            <p>24 hours: ${pricing[24]} USD</p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button 
              className={`btn btn-success w-full ${room.taken ? 'btn-disabled' : ''}`}
              onClick={() => router.push(`/booking/${room._id}`)}
              disabled={room.taken}
            >
              {room.taken ? 'Not Available' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Render the form only if the user is an admin */}
      {currentUserRole === 'admin' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Update Room Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input input-success w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-success w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Room Number</label>
              <input 
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="input input-success w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-full">Update Room</button>
          </form>
        </div>
      )}
    </div>
  )
}
