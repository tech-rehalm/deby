
import AdminNavigation from '@/components/admin/AdminLayout'
import Users from '@/components/admin/users'
import React from 'react'

export default function page() {
  return (
    <AdminNavigation>
        <div className="w-full  min-h-screen bg-red-400">
         <Users/>   
        </div>
        
    </AdminNavigation>
  )
}
