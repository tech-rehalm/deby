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

export function Footer() {
  return (
    <footer className="bg-gray-800 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:content-center md:grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center sm:text-start">
          <div>
            <h3 className="footer-title">About Us</h3>
            <Link href="/about" className="link link-hover block">Our Story</Link>
            <Link href="/about" className="link link-hover block">Our Team</Link>
            <Link href="/about" className="link link-hover block">Careers</Link>
          </div>
          <div>
            <h3 className="footer-title">Our Services</h3>
            <Link href="/rooms" className="link link-hover block">Accommodations</Link>
            <Link href="/rooms" className="link link-hover block">Dining</Link>
            <Link href="/rooms" className="link link-hover block">Amenities</Link>
            <Link href="/rooms" className="link link-hover block">Events</Link>
          </div>
          <div>
            <h3 className="footer-title">Support</h3>
            <Link href="/contact" className="link link-hover block">Contact Us</Link>
            <Link href="/about" className="link link-hover block">FAQs</Link>
            <Link href="/contact" className="link link-hover block">Booking Information</Link>
          </div>
          <div>
            <h3 className="footer-title">Connect With Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://x.com/MakhosiNcubea" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-success hover:text-success-focus" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100084685800756" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6 text-success hover:text-success-focus" />
              </a>
              <a href="https://www.instagram.com/mac_rehalm" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6 text-success hover:text-success-focus" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 Deby Hotel - All rights reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
              <Link href="/terms" className="link link-hover">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}