'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useSession } from 'next-auth/react'  // Import useSession from next-auth
import { toast } from 'react-toastify'

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
    totalPrice: number  // Added totalPrice to the store
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
        totalPrice: 0,  // Initialize totalPrice
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
            totalPrice: 0,  // Reset totalPrice
          },
        }),
    }),
    {
      name: 'booking-storage',
    }
  )
)

export default function CheckoutPage() {
  const { data: session } = useSession()  // Get the session
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
      // Check if user is authenticated
      if (!session?.user?._id) {
        throw new Error('User is not authenticated')
      }

      // Place the order with the user ID from the session
      const orderResponse = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user._id,  // Add the user ID from session
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

      // Update house status
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

      // Clear booking data from Zustand store
      clearBookingData()

      // Redirect to payment page
      toast.success("Order Placed")
      router.push(`/order/${orderData._id}`)
    } catch (err) {
        console.log(err);
        toast.error("error trying to place order")
      setError("error trying to place order")
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading) return <div className="text-center pt-16">Loading...</div>
  if (error) return <div className="text-center pt-16 text-error">{error}</div>
  if (!room) return <div className="text-center pt-16">Room not found</div>

  return (
    <div className="container mx-auto p-4 pt-16">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Booking Details</h2>
          <p><strong>Room:</strong> {room.title}</p>
          <p><strong>Full Name:</strong> {bookingData.fullName}</p>
          <p><strong>Age:</strong> {bookingData.age}</p>
          <p><strong>Address:</strong> {bookingData.address}</p>
          <p><strong>Phone:</strong> {bookingData.phone}</p>
          <p><strong>Check In:</strong> {bookingData.checkIn}</p>
          <p><strong>Check Out:</strong> {bookingData.checkOut}</p>
          <p><strong>Number of People:</strong> {bookingData.numOfPeople}</p>
          <p><strong>Payment Method:</strong> {bookingData.paymentMethod}</p>
          <p><strong>Special Requests:</strong> {bookingData.specialRequests || 'None'}</p>
          <p><strong>Total Price:</strong> ${bookingData.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link href={`/booking/${params.id}`} className="btn btn-outline btn-success">
          Edit Details
        </Link>
        <button 
          className="btn btn-success" 
          onClick={placeOrder}
          disabled={placingOrder}
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
    </div>
  )
}
