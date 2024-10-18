"use client"

import React, { useState, useEffect } from 'react'
import { Hotel, Users, Home, ShoppingBag, Building, UserCheck, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const navItems = [
  { href: '/admin', icon: Hotel, label: 'Dashboard' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/rooms', icon: Home, label: 'Rooms' },
  { href: '/admin/bookings', icon: ShoppingBag, label: 'Bookings' },
  { href: '/admin/apartments', icon: Building, label: 'Apartments' },
  { href: '/profile', icon: UserCheck, label: 'Profile' },
]

export default function AdminNavigation({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathName = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsOpen(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (session?.user.role !== "admin") {
    redirect("/")
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className="flex min-h-screen bg-gray-800 ">
      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        ${isMobile ? (isOpen ? 'w-64' : 'w-0') : ''}
        flex flex-col
        transition-all duration-300 ease-in-out
        bg-success text-success-content
        fixed top-0 left-0 h-full z-50
      `}>
        <div className="flex items-center justify-between h-16 px-4 mt-[70px]">
          {!isMobile && (
            <button onClick={toggleSidebar} className="btn btn-circle btn-ghost btn-sm">
              {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          )}
          {isOpen && <h2 className="text-xl font-semibold">Admin Panel</h2>}
        </div>
        <nav className="flex-1">
          <ul className="menu p-2 rounded-box">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`
                  ${pathName === item.href ? 'active' : ''}
                `}>
                  <item.icon className="w-6 h-6" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col ${isOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}>
        <header className="bg-base-100 shadow-md z-40 fixed top-[70px] left-0 right-0">
          <div className="navbar">
            <div className="flex-none">
              {isMobile && (
                <button onClick={toggleSidebar} className="btn btn-square btn-ghost">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
            <div className="flex-1 bg-gray-800">
              <h1 className="text-2xl font-semibold text-success pl-[100px] ">Welcome, Admin</h1>
            </div>
            <div className="flex-none">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gray-800 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}