'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.destination || !searchParams.checkIn || !searchParams.checkOut) {
      toast.error('Please fill all required fields')
      return
    }

    toast.loading('Searching hotels...')
    
    try {
      const response = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(`Found ${data.data.length} hotels!`)
      } else {
        toast.error(data.error || 'Search failed')
      }
    } catch (error) {
      toast.error('Failed to search hotels')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Hotels</h1>
          <p className="text-xl">Discover amazing accommodations worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                  placeholder="City, hotel, or landmark"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={searchParams.rooms}
                  onChange={(e) => setSearchParams({...searchParams, rooms: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Hotels</span>
            </button>
          </form>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Hotel Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Delhi', 'Mumbai', 'Goa', 'Kerala', 'Dubai', 'Thailand'].map((city) => (
              <div key={city} className="card cursor-pointer hover:scale-105 transition-transform">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white opacity-50" />
                </div>
                <h3 className="text-xl font-bold">{city}</h3>
                <p className="text-gray-600">Explore hotels in {city}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}