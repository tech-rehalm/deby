"use client"

import AdminNavigation from '@/components/admin/AdminLayout'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { toast } from 'react-toastify'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export type Booking = {
  _id: string;
  user?: { name: string };
  userDetails: {
    fullName: string;
    age: number;
    address: string;
    phone: number;
  };
  room: { title: string };
  image: string
  title: string
  checkIn: Date;
  checkOut: Date;
  numOfPeople: number;
  paymentMethod: string;
  paidAt?: Date;
  totalPrice?: number;
  status: "pending" | "paid";
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default function Page() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/order')
      if (!response.ok) throw new Error('Failed to fetch bookings')
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (id: string, status: "pending" | "paid") => {
    try {
      const response = await fetch(`/api/booking/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) toast.error('Failed to update booking status')
      if (response.ok) toast.success('Order status updated')
      fetchBookings() 

    // Refresh bookings after update
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/booking/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete booking')
      fetchBookings() // Refresh bookings after deletion
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  const totalOrders = bookings.length
  const paidOrders = bookings.filter(booking => booking.status === 'paid').length
  const pendingOrders = totalOrders - paidOrders

  const chartData = {
    labels: ['Total Orders', 'Paid Orders', 'Pending Orders'],
    datasets: [
      {
        label: 'Order Statistics',
        data: [totalOrders, paidOrders, pendingOrders],
        fill: false,
        borderColor: 'rgba(72, 187, 120, 1)',
        backgroundColor: 'rgba(72, 187, 120, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(72, 187, 120, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(72, 187, 120, 1)',
        tension: 0.1,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Booking Statistics',
      },
    },
  }

  return (
    <AdminNavigation>
      <div className="p-6 mt-[50px] min-h-screen">
        <h1 className="text-3xl font-bold text-success mb-6">Bookings Management</h1>
        
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card bg-gray-900 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-success">Total Bookings</h2>
              <p className="text-4xl font-bold">{totalOrders}</p>
            </div>
          </div>
          <div className="card bg-gray-900 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-success">Paid Bookings</h2>
              <p className="text-4xl font-bold">{paidOrders}</p>
            </div>
          </div>
          <div className="card bg-gray-900 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-success">Pending Bookings</h2>
              <p className="text-4xl font-bold">{pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-gray-900 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-success mb-4">Bookings Statistics</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-success"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="hidden md:table-cell">ID</th>
                  <th>User</th>
                  <th>Room</th>
                  <th className="hidden md:table-cell">Check In</th>
                  <th className="hidden md:table-cell">Check Out</th>
                  <th>Total Price</th>
                  <th className="hidden md:table-cell">Status</th>
                  <th className="hidden md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking._id}>
                    <td className="hidden md:table-cell">{booking._id}</td>
                    <td>{booking.user?.name || booking.userDetails.fullName}</td>
                    <td>{booking.room.title}</td>
                    <td className="hidden md:table-cell">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="hidden md:table-cell">{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td>${booking.totalPrice}</td>
                    <td className="hidden md:table-cell">
                      <select
                        className="select select-bordered select-sm select-success bg-gray-800 text-success w-full max-w-xs"
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value as "pending" | "paid")}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                    </td>
                    <td className="hidden md:table-cell">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteBooking(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminNavigation>
  )
}