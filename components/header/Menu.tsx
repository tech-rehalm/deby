'use client'

import { useState } from 'react'
import Link from 'next/link'
import {  signOut, useSession } from 'next-auth/react'
import { Home, Hotel, Info, Mail, Menu, User, LogIn, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' })
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/rooms', label: 'Find Rooms', icon: Hotel },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]

  const NavLinks = ({ mobile = false, onClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 p-2 transition-colors hover:text-primary ${
            mobile ? 'text-lg' : ''
          } ${pathname === item.href && "bg-success text-black rounded-lg hover:text-black "} transition duration-500 hover:scale-110`}
          onClick={onClick}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </>
  )

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-gray-800 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 text-success">
          <Hotel className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">Deby Hotel</span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden btn btn-ghost btn-circle" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </button>

        {/* User Menu */}
        {session && session.user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-success flex">
              <User className="h-4 w-4" /><span >{session?.user.name}</span>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-900 rounded-box w-52">
              <li>
                <span className="font-bold">{session.user.name}</span>
              </li>
              {session.user.role === 'admin' && (
                <li>
                  <Link href="/admin">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link href={`/myorders/${session.user._id}`}>My Bookings</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="text-left btn btn-success">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/register" className="btn btn-outline">
              <User className="mr-2 h-4 w-4" />
              Register
            </Link>
            <Link href="/signin" className="btn btn-success">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-base-200 p-4">
          <nav className="space-y-4">
            <NavLinks mobile onClick={() => setIsOpen(false)} />
            {!session && (
              <>
                <Link href="/register" className="btn btn-outline w-full" onClick={() => setIsOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Link>
                <Link href="/signin" className="btn btn-success w-full" onClick={() => setIsOpen(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </>
            )}
            {session && session.user && (
              <button className="btn btn-error w-full" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            )}
          </nav>
        </div>
      )}
    </nav>
  )
}
