'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { Search, MapPin, Calendar, Users, Star, Wifi, Coffee, Car, Dumbbell } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Hotel } from '@/types'

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  })
  
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.destination || !searchParams.checkIn || !searchParams.checkOut) {
      toast.error('Please fill all required fields')
      return
    }

    setIsSearching(true)
    setHasSearched(false)
    const loadingToast = toast.loading('Searching hotels...')
    
    try {
      const response = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setHotels(data.data)
        setHasSearched(true)
        toast.success(`Found ${data.data.length} hotels!`, { id: loadingToast })
      } else {
        toast.error(data.error || 'Search failed', { id: loadingToast })
        setHotels([])
        setHasSearched(true)
      }
    } catch (error) {
      toast.error('Failed to search hotels', { id: loadingToast })
      setHotels([])
      setHasSearched(true)
    } finally {
      setIsSearching(false)
    }
  }

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes('wifi')) return <Wifi className="h-4 w-4" />
    if (amenityLower.includes('breakfast') || amenityLower.includes('restaurant')) return <Coffee className="h-4 w-4" />
    if (amenityLower.includes('parking')) return <Car className="h-4 w-4" />
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell className="h-4 w-4" />
    return <Star className="h-4 w-4" />
  }

  const calculateNights = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 0
    const checkIn = new Date(searchParams.checkIn)
    const checkOut = new Date(searchParams.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Hotels</h1>
          <p className="text-xl">Discover amazing accommodations worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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
            
            <button 
              type="submit" 
              disabled={isSearching}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-5 w-5" />
              <span>{isSearching ? 'Searching...' : 'Search Hotels'}</span>
            </button>
          </form>
        </div>
        
        {/* Hotel Results */}
        {hasSearched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {hotels.length > 0 ? `Found ${hotels.length} Hotels` : 'No Hotels Found'}
            </h2>
            
            {hotels.length > 0 ? (
              <div className="space-y-6">
                {hotels.map((hotel) => {
                  const nights = calculateNights()
                  const totalPrice = hotel.price * nights
                  
                  return (
                    <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {/* Hotel Image */}
                        <div className="md:w-1/3">
                          <div className="h-64 md:h-full bg-gradient-to-br from-primary-300 to-secondary-300 flex items-center justify-center">
                            {hotel.images && hotel.images.length > 0 ? (
                              <img 
                                src={hotel.images[0]} 
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <MapPin className="h-16 w-16 text-white opacity-50" />
                            )}
                          </div>
                        </div>
                        
                        {/* Hotel Details */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{hotel.address}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < Math.floor(hotel.rating) 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-semibold">{hotel.rating.toFixed(1)}</span>
                                <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-3xl font-bold text-primary-600">
                                ₹{hotel.price.toLocaleString('en-IN')}
                              </div>
                              <div className="text-sm text-gray-500">per night</div>
                              {nights > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  ₹{totalPrice.toLocaleString('en-IN')} for {nights} night{nights > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{hotel.description}</p>
                          
                          {/* Amenities */}
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                                >
                                  {getAmenityIcon(amenity)}
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t">
                            <button className="text-primary-600 font-semibold hover:text-primary-700">
                              View Details
                            </button>
                            <button className="btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No hotels found for your search criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your dates or destination.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Hotel Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Delhi', 'Mumbai', 'Goa', 'Kerala', 'Dubai', 'Thailand'].map((city) => (
              <div key={city} className="card cursor-pointer hover:scale-105 transition-transform">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg mb-4 flex items-center justify-center">
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