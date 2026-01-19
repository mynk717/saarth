'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { Search, Calendar, Users, Plane, Clock, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Flight } from '@/types'

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
  
  const [flights, setFlights] = useState<Flight[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.to || !searchParams.departDate) {
      toast.error('Please fill all required fields')
      return
    }

    setIsSearching(true)
    setHasSearched(false)
    const loadingToast = toast.loading('Searching flights...')
    
    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setFlights(data.data)
        setHasSearched(true)
        toast.success(`Found ${data.data.length} flights!`, { id: loadingToast })
      } else {
        toast.error(data.error || 'Search failed', { id: loadingToast })
        setFlights([])
        setHasSearched(true)
      }
    } catch (error) {
      toast.error('Failed to search flights', { id: loadingToast })
      setFlights([])
      setHasSearched(true)
    } finally {
      setIsSearching(false)
    }
  }

  const formatTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDuration = (duration: string) => {
    // Convert ISO 8601 duration (PT2H30M) to readable format
    const hours = duration.match(/\d+H/)?.[0].replace('H', '') || '0'
    const minutes = duration.match(/\d+M/)?.[0].replace('M', '') || '0'
    return `${hours}h ${minutes}m`
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Flights</h1>
          <p className="text-xl">Find the best flights from Raipur to anywhere in the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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
            
            <button 
              type="submit" 
              disabled={isSearching}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-5 w-5" />
              <span>{isSearching ? 'Searching...' : 'Search Flights'}</span>
            </button>
          </form>
        </div>
        
        {/* Flight Results */}
        {hasSearched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {flights.length > 0 ? `Found ${flights.length} Flights` : 'No Flights Found'}
            </h2>
            
            {flights.length > 0 ? (
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {flight.airline}
                          </div>
                          <div className="text-gray-600 text-sm">
                            Flight {flight.flightNumber}
                          </div>
                          <div className="text-gray-600 text-sm capitalize">
                            {flight.class}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 items-center">
                          {/* Departure */}
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.departure.time)}
                            </div>
                            <div className="text-gray-600">{flight.departure.airport}</div>
                            <div className="text-sm text-gray-500">{flight.departure.city}</div>
                          </div>
                          
                          {/* Duration & Stops */}
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <Plane className="h-5 w-5 text-primary-500" />
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatDuration(flight.duration)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                            </div>
                          </div>
                          
                          {/* Arrival */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.arrival.time)}
                            </div>
                            <div className="text-gray-600">{flight.arrival.airport}</div>
                            <div className="text-sm text-gray-500">{flight.arrival.city}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price & Book Button */}
                      <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-end">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          ₹{flight.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-sm text-gray-500 mb-3">
                          {flight.availableSeats} seats left
                        </div>
                        <button className="btn-primary flex items-center space-x-2">
                          <span>Book Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No flights found for your search criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your dates or destination.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Why Book Flights with Saarth Holidays?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <Plane className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">We compare prices from multiple airlines to get you the best deals</p>
            </div>
            <div className="card">
              <Calendar className="h-12 w-12 text-secondary-600 mb-4" />
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