import Link from 'next/link'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-screen bg-base-200 relative">
      <Hero/>
      <Services/>
    </div>
  )
}

