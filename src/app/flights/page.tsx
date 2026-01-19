'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { Search, Calendar, Users, Plane } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState({
    from: 'RPR',
    to: '',
    departDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    travelClass: 'economy'
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.to || !searchParams.departDate) {
      toast.error('Please fill all required fields')
      return
    }

    toast.loading('Searching flights...')
    
    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(`Found ${data.data.length} flights!`)
        // Handle results display
      } else {
        toast.error(data.error || 'Search failed')
      }
    } catch (error) {
      toast.error('Failed to search flights')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Flights</h1>
          <p className="text-xl">Find the best flights from Raipur to anywhere in the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  placeholder="RPR - Raipur"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To *
                </label>
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  placeholder="DEL - Delhi"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date *
                </label>
                <input
                  type="date"
                  value={searchParams.departDate}
                  onChange={(e) => setSearchParams({...searchParams, departDate: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={searchParams.returnDate}
                  onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adults
                </label>
                <input
                  type="number"
                  min="1"
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams({...searchParams, adults: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Children
                </label>
                <input
                  type="number"
                  min="0"
                  value={searchParams.children}
                  onChange={(e) => setSearchParams({...searchParams, children: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Class
                </label>
                <select
                  value={searchParams.travelClass}
                  onChange={(e) => setSearchParams({...searchParams, travelClass: e.target.value as any})}
                  className="input-field"
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Flights</span>
            </button>
          </form>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Why Book Flights with Saarth Holidays?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <Plane className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">We compare prices from multiple airlines to get you the best deals</p>
            </div>
            <div className="card">
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
              <p className="text-gray-600">Easy cancellation and date change options available</p>
            </div>
            <div className="card">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our Raipur team is always ready to help you</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}