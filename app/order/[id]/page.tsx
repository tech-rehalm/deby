'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Calendar, Users, Phone, MapPin, CreditCard, FileText, DollarSign, CheckCircle, AlertCircle, Loader } from 'lucide-react'

type OrderDetails = {
  _id: string
  userDetails: {
    fullName: string
    age: number
    address: string
    phone: number
  }
  room: {
    title: string
  }
  title: string
  checkIn: string
  checkOut: string
  numOfPeople: number
  paymentMethod: string
  totalPrice: number
  status: 'pending' | 'paid' | 'cancelled'
  specialRequests?: string
}

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order')
        }
        const data = await response.json()
        setOrder(data)
        setPaymentSuccess(new URLSearchParams(window.location.search).get('payment') === 'success')
      } catch (err) {
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  const updateOrderStatus = async (status: 'paid') => {
    try {
      const response = await fetch(`/api/order/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      setOrder((prevOrder) => (prevOrder ? { ...prevOrder, status } : null))
    } catch (err) {
      setError('Failed to update order status')
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

  if (!order) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertCircle className="h-12 w-12 text-warning mb-4" />
      <p className="text-xl">Order not found</p>
    </div>
  )

  return (
    <div className="container mx-auto p-4 pt-16 mt-[60px]">
      <h1 className="text-4xl font-bold text-center mb-8 text-success">Order Details</h1>

      {paymentSuccess && (
        <div className="alert alert-success shadow-lg mb-8">
          <div>
            <CheckCircle className="stroke-current flex-shrink-0 h-6 w-6" />
            <span>Thank you for your payment! Your order has been successfully processed.</span>
          </div>
        </div>
      )}

      <div className="card bg-gray-900 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Booking Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="flex items-center mb-2"><FileText className="mr-2 text-success" /> <strong>Order ID:</strong> {order._id}</p>
              <p className="flex items-center mb-2"><FileText className="mr-2 text-success" /> <strong>Suite:</strong> {order.title}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Full Name:</strong> {order.userDetails.fullName}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Age:</strong> {order.userDetails.age}</p>
              <p className="flex items-center mb-2"><MapPin className="mr-2 text-success" /> <strong>Address:</strong> {order.userDetails.address}</p>
              <p className="flex items-center mb-2"><Phone className="mr-2 text-success" /> <strong>Phone:</strong> {order.userDetails.phone}</p>
            </div>
            <div>
              <p className="flex items-center mb-2"><Calendar className="mr-2 text-success" /> <strong>Check In:</strong> {new Date(order.checkIn).toLocaleDateString()}</p>
              <p className="flex items-center mb-2"><Calendar className="mr-2 text-success" /> <strong>Check Out:</strong> {new Date(order.checkOut).toLocaleDateString()}</p>
              <p className="flex items-center mb-2"><Users className="mr-2 text-success" /> <strong>Number of People:</strong> {order.numOfPeople}</p>
              <p className="flex items-center mb-2"><CreditCard className="mr-2 text-success" /> <strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p className="flex items-center mb-2"><FileText className="mr-2 text-success" /> <strong>Special Requests:</strong> {order.specialRequests || 'None'}</p>
              <p className="flex items-center mb-2"><DollarSign className="mr-2 text-success" /> <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
              <p className="flex items-center mb-2">
                <strong>Status:</strong>{' '}
                <span className={`badge ml-2 ${order.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {order.status !== 'paid' && (
        <div className="card bg-gray-900 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Complete Your Payment</h2>
            <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: 'USD',
                          value: order.totalPrice.toString(),
                        },
                      },
                    ],
                  })
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    const details = await actions.order.capture()
                    if (details.status === 'COMPLETED') {
                      await updateOrderStatus('paid')
                      setPaymentSuccess(true)
                      router.push(`/order/${order._id}?payment=success`)
                    }
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <AlertCircle className="stroke-current flex-shrink-0 h-6 w-6" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}