import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Saarth Holidays</h3>
            <p className="text-sm mb-4">
              Chhattisgarh&apos;s best travel agency. Making your travel dreams come true since 2020.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary-400" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary-400" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/flights" className="hover:text-primary-400">Flights</Link></li>
              <li><Link href="/hotels" className="hover:text-primary-400">Hotels</Link></li>
              <li><Link href="/packages" className="hover:text-primary-400">Packages</Link></li>
              <li><Link href="/itinerary" className="hover:text-primary-400">Custom Itinerary</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary-400">Visa Assistance</Link></li>
              <li><Link href="#" className="hover:text-primary-400">Travel Insurance</Link></li>
              <li><Link href="#" className="hover:text-primary-400">Group Tours</Link></li>
              <li><Link href="#" className="hover:text-primary-400">Corporate Travel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-sm">Raipur, Chhattisgarh, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-primary-400">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@saarthholidays.com" className="text-sm hover:text-primary-400">
                  info@saarthholidays.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Saarth Holidays. All rights reserved. | Made with ❤️ in Chhattisgarh</p>
        </div>
      </div>
    </footer>
  )
}