'use client'

import { useState, useEffect } from 'react'
import { redirect, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { CreditCard, Calendar, Users, Phone, MapPin, FileText, DollarSign, Loader, AlertCircle, CheckCircle } from 'lucide-react'

type BookingStore = {
  bookingData: {
    fullName: string
    age: string
    address: string
    phone: string
    title: string
    image: string
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
        title: '',
        image: '',
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
            title: '',
            image: '',
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

export default function CheckoutPage() {
  const { data: session } = useSession()
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { bookingData, clearBookingData } = useBookingStore()

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

  const placeOrder = async () => {
    setPlacingOrder(true)
    try {
      if (!session?.user?._id) {
        toast.error('Please sign in to place an order')
        redirect("/signin")
      }

      const orderResponse = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session?.user._id,
          userDetails: {
            fullName: bookingData.fullName,
            age: parseInt(bookingData.age),
            address: bookingData.address,
            phone: parseInt(bookingData.phone),
          },
          title: room.title,
          image: room.image,
          room: params.id,
          checkIn: new Date(bookingData.checkIn),
          checkOut: new Date(bookingData.checkOut),
          numOfPeople: parseInt(bookingData.numOfPeople),
          paymentMethod: bookingData.paymentMethod,
          totalPrice: bookingData.totalPrice,
          specialRequests: bookingData.specialRequests,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to place order')
      }

      const orderData = await orderResponse.json()

      const houseResponse = await fetch(`/api/house/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taken: true,
          availableAfter: bookingData.checkOut,
        }),
      })

      if (!houseResponse.ok) {
        throw new Error('Failed to update house status')
      }

      clearBookingData()
      toast.success("Order Placed successfully")
      router.push(`/order/${orderData._id}`)
    } catch (err) {
      console.log(err);
      setError("Error trying to place order")
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin h-12 w-12 text-success" />
    </div>
  )
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertCircle className="h-12 w-12 text-error mb-4" />
      <p className="text-xl text-error">{error}</p>
    </div>
  )
  
  if (!room) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertCircle className="h-12 w-12 text-warning mb-4" />
      <p className="text-xl">Room not found</p>
    </div>
  )

  return (
    <div className="container mx-auto p-4 pt-16 mt-[60px] h-screen ">
      <h1 className="text-4xl font-bold text-center mb-8 text-success">Checkout</h1>
      
      <div className="card bg-gray-900 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="flex items-center mb-2"><FileText className="mr-2 text-success" /> <strong>Room:</strong> {room.title}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Full Name:</strong> {bookingData.fullName}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Age:</strong> {bookingData.age}</p>
              <p className="flex items-center mb-2"><MapPin className="mr-2 text-success" /> <strong>Address:</strong> {bookingData.address}</p>
              <p className="flex items-center mb-2"><Phone className="mr-2 text-success" /> <strong>Phone:</strong> {bookingData.phone}</p>
            </div>
            <div>
              <p className="flex items-center mb-2"><Calendar className="mr-2 text-success" /> <strong>Check In:</strong> {bookingData.checkIn}</p>
              <p className="flex items-center mb-2"><Calendar className="mr-2 text-success" /> <strong>Check Out:</strong> {bookingData.checkOut}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Number of People:</strong> {bookingData.numOfPeople}</p>
              <p className="flex items-center mb-2"><CreditCard className="mr-2 text-success" /> <strong>Payment Method:</strong> {bookingData.paymentMethod}</p>
              <p className="flex items-center mb-2"><FileText className="mr-2 text-success" /> <strong>Special Requests:</strong> {bookingData.specialRequests || 'None'}</p>
              <p className="flex items-center mb-2"><DollarSign className="mr-2 text-success" /> <strong>Total Price:</strong> ${bookingData.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <Link href={`/booking/${params.id}`} className="btn btn-outline btn-success w-full sm:w-auto">
          <FileText className="mr-2" /> Edit Details
        </Link>
        <button 
          className="btn btn-success w-full sm:w-auto"
          onClick={placeOrder}
          disabled={placingOrder}
        >
          {placingOrder ? <><Loader className="animate-spin mr-2" /> Placing Order...</> : <><CheckCircle className="mr-2" /> Place Order</>}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}
    </div>
  )
}