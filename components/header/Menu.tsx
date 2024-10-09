'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
const Menu = () => {

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' })
  }

  const { data: session } = useSession()


  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  return (
    <>
      <div className="hidden md:block">
      </div>
      <div>
        <ul className="flex items-stretch">
          <Link href="/rooms" className='p-3 transition duration-500 hover:text-success hover:scale-125 hover:bg-gray-800 rounded-lg md:mx-3'>Find Rooms</Link>
          <Link href="/about" className='p-3 transition duration-500 hover:text-success hover:scale-125 hover:bg-gray-800 rounded-lg md:mx-3'>About Us</Link>
          <Link href="/contact" className='p-3 transition duration-500 hover:text-success hover:scale-125 hover:bg-gray-800 rounded-lg md:mx-3'>Contact</Link>
          {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn capitalize btn-success rounded-btn">
                    {session.user.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu text-success dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                  >
                    {session.user.role === "admin" && (
                      <li onClick={handleClick}>
                        <Link href="/admin/">Admin Dashboard</Link>
                      </li>
                    )}

                    <li onClick={handleClick}>
                      <Link href={`/myorders/${session.user._id}`}>My Bookings </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <>
                  <Link href="/register" className='p-3 transition duration-500 hover:text-success hover:scale-125 hover:bg-gray-800 rounded-lg md:mx-3'>Register</Link>
                  <Link href="/signin" className='p-3 transition duration-500 hover:text-success hover:scale-125 hover:bg-gray-800 rounded-lg md:mx-3'>Sign In</Link>

            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default Menu
