'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Plane, Phone } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Flights', href: '/flights' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Packages', href: '/packages' },
    { name: 'Itinerary', href: '/itinerary' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-600">Saarth Holidays</h1>
              <p className="text-xs text-gray-600">Chhattisgarh&apos;s Best Travel Agency</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+919876543210" className="flex items-center space-x-2 btn-primary">
              <Phone className="h-4 w-4" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+919876543210" className="btn-primary mt-4 inline-block">
              Call Us
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}