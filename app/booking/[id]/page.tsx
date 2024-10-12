'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Loading from '@/app/loading'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

type Room = {
  _id: string
  title: string
  category: string
  description: string
  image: string
  field: string
}

type BookingStore = {
  bookingData: {
    fullName: string
    age: string
    address: string
    phone: string
    checkIn: string
    checkOut: string
    numOfPeople: string
    paymentMethod: string
    specialRequests: string
    totalPrice: number
  }
  setBookingData: (data: Partial<BookingStore['bookingData']>) => void
  clearBookingData: () => void
}

const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookingData: {
        fullName: '',
        age: '',
        address: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        numOfPeople: '',
        paymentMethod: '',
        specialRequests: '',
        totalPrice: 0,
      },
      setBookingData: (data) =>
        set((state) => ({ bookingData: { ...state.bookingData, ...data } })),
      clearBookingData: () =>
        set({
          bookingData: {
            fullName: '',
            age: '',
            address: '',
            phone: '',
            checkIn: '',
            checkOut: '',
            numOfPeople: '',
            paymentMethod: '',
            specialRequests: '',
            totalPrice: 0,
          },
        }),
    }),
    {
      name: 'booking-storage',
    }
  )
)

export default function BookingPage() {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()
  const router = useRouter()
  const { bookingData, setBookingData } = useBookingStore()
  const { data: session } = useSession()


  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`/api/apartments/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch room')
        }
        const data = await response.json()
        setRoom(data)
      } catch (err) {
        setError('Failed to load room details')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [params.id])

  const calculatePrice = (category: string, field: string, days: number) => {
    const prices = {
      Rooms: { Medium: { 12: 60, 24: 110 }, Large: { 12: 80, 24: 130 } },
      Conference: { Medium: { 12: 60, 24: 110 }, Large: { 12: 80, 24: 130 } },
      Venue: { Medium: { 12: 200, 24: 300 }, Large: { 12: 300, 24: 400 } },
      Gazebo: { Medium: { 12: 30, 24: 50 }, Large: { 12: 50, 24: 70 } }
    }

    const hourlyRate = prices[field as keyof typeof prices]?.[category as 'Medium' | 'Large']?.[24] / 24 || 0
    return hourlyRate * 24 * days
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(session?.user.role !== "admin"){
      toast.error("Please sign in to continue")
     }
    const formData = new FormData(event.currentTarget)
    const bookingDetails = Object.fromEntries(formData.entries())
    
    if (room) {
      const checkIn = new Date(bookingDetails.checkIn as string)
      const checkOut = new Date(bookingDetails.checkOut as string)
      let days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24))
      if(days === 0){
        days = 1
      }
      
      const totalPrice = calculatePrice(room.category, room.field, days)
      console.log(totalPrice);
    

      setBookingData({
        ...bookingDetails as Partial<BookingStore['bookingData']>,
        totalPrice,
      })
    }

    router.push(`/checkout/${params.id}`)
  }

  if (loading) return <Loading/>
  if (error) return <div className="text-center pt-16 text-error">{error}</div>
  if (!room) return <div className="text-center pt-16">Room not found</div>

  return (
    <div className="container mx-auto p-4 pt-16">
      <h1 className="text-3xl font-bold text-center mb-6">Book Your Stay</h1>
      
      <div className="card bg-base-100 shadow-xl mb-6">
        <figure>
          <Image src={`${room.image}`} alt={room.title} width={400} height={300} className="w-full h-64 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{room.title}</h2>
          <p className="badge badge-success">{room.category}</p>
          <p>{room.description.split('.')[0]}.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-control gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full Name" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.fullName}
            onChange={(e) => setBookingData({ fullName: e.target.value })}
          />
          <input 
            type="number" 
            name="age" 
            placeholder="Age" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.age}
            onChange={(e) => setBookingData({ age: e.target.value })}
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.address}
            onChange={(e) => setBookingData({ address: e.target.value })}
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.phone}
            onChange={(e) => setBookingData({ phone: e.target.value })}
          />
          <input 
            type="date" 
            name="checkIn" 
            placeholder="Check In" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.checkIn}
            onChange={(e) => setBookingData({ checkIn: e.target.value })}
          />
          <input 
            type="date" 
            name="checkOut" 
            placeholder="Check Out" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.checkOut}
            onChange={(e) => setBookingData({ checkOut: e.target.value })}
          />
          <input 
            type="number" 
            name="numOfPeople" 
            placeholder="Number of People" 
            className="input input-bordered input-success" 
            required 
            value={bookingData.numOfPeople}
            onChange={(e) => setBookingData({ numOfPeople: e.target.value })}
          />
          <select 
            name="paymentMethod" 
            className="select select-bordered select-success" 
            required
            value={bookingData.paymentMethod}
            onChange={(e) => setBookingData({ paymentMethod: e.target.value })}
          >
            <option value="" disabled>Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        
        <textarea 
          name="specialRequests" 
          className="textarea textarea-bordered textarea-success" 
          placeholder="Special Requests"
          value={bookingData.specialRequests}
          onChange={(e) => setBookingData({ specialRequests: e.target.value })}
        ></textarea>
        
        <button type="submit" className="btn btn-success">Proceed to Checkout</button>
      </form>
    </div>
  )
}