'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/app/loading'

type Order = {
  _id: string
  room: {
    _id: string
    title: string
    image: string
  }
  title:string
  image:string
  checkIn: string
  checkOut: string
  numOfPeople: number
  totalPrice: number
  status: 'pending' | 'paid' | 'cancelled'
}

type User = {
  _id: string
  name: string
  email: string
}

export default function UserBookingsPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, userResponse] = await Promise.all([
          fetch(`/api/booking/${params.id}`),
          fetch(`/api/users/${params.id}`)
        ])

        if (!ordersResponse.ok || !userResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const ordersData = await ordersResponse.json()
        const userData = await userResponse.json()

        setOrders(ordersData)
        setUser(userData)
      } catch (err) {
        setError('Failed to load bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) return <Loading/>
  if (error) return <div className="text-center pt-16 text-error">{error}</div>
  if (!user) return <div className="text-center pt-16">User not found</div>

  return (
    <div className="min-h-screen bg-success p-4 pt-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-success-content">Your Bookings</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-success-content">No bookings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="card bg-base-100 shadow-xl overflow-hidden">
                <figure className="relative h-48">
                  <Link href={`/order/${order._id}`}>
                  <Image 
                    src={`${order.image}`} 
                    alt={order.room.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  </Link>
                  <div className="absolute bottom-2 left-2 text-white font-bold">{order.room.title}</div>
                </figure>
                <div className="card-body bg-gradient-to-b from-success/10 to-transparent">
                  <h3 className="card-title text-lg">{order.title}</h3>
                  <p><strong>Check In:</strong> {new Date(order.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check Out:</strong> {new Date(order.checkOut).toLocaleDateString()}</p>
                  <p><strong>Guests:</strong> {order.numOfPeople}</p>
                  <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                  <div className="card-actions justify-end mt-2">
                    <div className={`badge ${
                      order.status === 'paid' ? 'badge-success' : 
                      order.status === 'cancelled' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}