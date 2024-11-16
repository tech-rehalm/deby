'use client'

import AdminNavigation from '@/components/admin/AdminLayout'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export default function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/apartments')
      if (!response.ok) {
        throw new Error('Failed to fetch rooms')
      }
      const data = await response.json()
      setRooms(data?.houses)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      toast.error('Failed to load rooms')
    }
  }

  const toggleTaken = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/house/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taken: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update room status')
      }

      setRooms(rooms?.map(room => 
        room._id === id ? { ...room, taken: !currentStatus } : room
      ))

      toast.success('Room status updated successfully')
    } catch (error) {
      console.error('Error updating room status:', error)
      toast.error('Failed to update room status')
    }
  }

  return (
    <AdminNavigation>
      <h1 className="text-2xl font-bold mb-4">Room Management</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th className="hidden md:table-cell">Number</th>
              <th>Title</th>
              <th className="hidden md:table-cell">Category</th>
              <th className="hidden md:table-cell">Field</th>
              <th className="hidden md:table-cell">Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={room.image} alt={room.title} />
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell">{room.number}</td>
                <td>{room.title}</td>
                <td className="hidden md:table-cell">{room.category}</td>
                <td className="hidden md:table-cell">{room.field}</td>
                <td className="hidden md:table-cell">
                  {room.description.length > 50
                    ? `${room.description.substring(0, 50)}...`
                    : room.description}
                </td>
                <td>
                  <button
                    onClick={() => toggleTaken(room._id, room.taken)}
                    className={`btn btn-sm ${
                      room.taken ? 'btn-error' : 'btn-success'
                    }`}
                  >
                    {room.taken ? 'Occupied' : 'Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminNavigation>
  )
}