'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Users, DollarSign, Home, Calendar } from 'lucide-react'
import AdminNavigation from '@/components/admin/AdminLayout'
import Loading from '../loading'

type User = {
  _id: string
  name: string
  email: string
  role: string
}

type Booking = {
  _id: string
  title: string
  totalPrice: number
  status: string
  createdAt: string
}

type House = {
  _id: string
  title: string
  image: string
  description: string
  taken: boolean
  number: number
  field: string
  category: string
}

type DashboardData = {
  totalUsers: number
  totalBookings: number
  totalRevenue: number
  totalHouses: number
  recentBookings: Booking[]
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
  bookingStatusDistribution: Array<{
    status: string
    count: number
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  
    const fetchDashboardData = async () => {
      if (status === 'loading') return
      if (!session || !session.user || session.user.role !== 'admin') {
        router.push('/signin')
        return
      }

      try {
        const [usersResponse, bookingsResponse, housesResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/order'),
          fetch('/api/apartments')
        ])

        if (!usersResponse.ok ) {
          throw new Error('Failed to fetch users')
        }
        if (!bookingsResponse.ok ) {
          throw new Error('Failed to fetch bokings')
        }
        if (!housesResponse.ok) {
          throw new Error('Failed to fetch houses')
        }

        const users: User[] = await usersResponse.json()
        const bookings: Booking[] = await bookingsResponse.json()
        const dat = await housesResponse.json()
        const houses: House[] = await(dat.houses)

        const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)

        const monthlyRevenue = bookings.reduce((acc, booking) => {
          const month = new Date(booking.createdAt).toLocaleString('default', { month: 'long' })
          acc[month] = (acc[month] || 0) + booking.totalPrice
          return acc
        }, {} as Record<string, number>)

        const bookingStatusDistribution = bookings.reduce((acc, booking) => {
          acc[booking.status] = (acc[booking.status] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        const data: DashboardData = {
          totalUsers: users.length,
          totalBookings: bookings.length,
          totalRevenue,
          totalHouses: houses.length,
          recentBookings: bookings.slice(0, 5),
          monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
          bookingStatusDistribution: Object.entries(bookingStatusDistribution).map(([status, count]) => ({ status, count }))
        }
        console.log(data)
        setDashboardData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data")
        console.log(err);
        
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
    fetchDashboardData()
  }, [session, status, router])

  if (loading) return <Loading />
  if (!dashboardData) fetchDashboardData()
  if (error) return <Loading/>

  return (
    <AdminNavigation>
      <h1 className="text-4xl font-bold text-center mb-8 mt-[60px]">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-sm font-medium flex justify-between">
              Total Users
              <Users className="h-4 w-4 text-primary" />
            </h2>
            <p className="text-2xl font-bold">{dashboardData?.totalUsers}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-sm font-medium flex justify-between">
              Total Bookings
              <Calendar className="h-4 w-4 text-primary" />
            </h2>
            <p className="text-2xl font-bold">{dashboardData?.totalBookings}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-sm font-medium flex justify-between">
              Total Revenue
              <DollarSign className="h-4 w-4 text-primary" />
            </h2>
            <p className="text-2xl font-bold">${dashboardData?.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-sm font-medium flex justify-between">
              Total Houses
              <Home className="h-4 w-4 text-primary" />
            </h2>
            <p className="text-2xl font-bold">{dashboardData?.totalHouses}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Monthly Revenue</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData?.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Booking Status Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData?.bookingStatusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {dashboardData?.bookingStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Bookings</h2>
          <p className="text-sm text-base-content text-opacity-60">Overview of the latest bookings</p>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.title}</td>
                    <td>${booking.totalPrice.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${
                        booking.status === 'paid' ? 'badge-success' : 
                        booking.status === 'pending' ? 'badge-error' : 
                        'badge-warning'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminNavigation>
  )
}