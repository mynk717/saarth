'use client'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { MapPin, Calendar, Users, Star } from 'lucide-react'
import Link from 'next/link'

interface PackageType {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  image: string
  rating: number
  reviews: number
  highlights: string[]
}

export default function PackagesPage() {
  const packages: PackageType[] = [
    {
      id: 'amsterdam',
      name: 'Amsterdam Explorer',
      destination: 'Amsterdam, Netherlands',
      duration: '7 Days / 6 Nights',
      price: 150000,
      image: 'https://source.unsplash.com/800x600/?amsterdam,canal',
      rating: 4.8,
      reviews: 234,
      highlights: ['Canal Cruise', 'Van Gogh Museum', 'Keukenhof Gardens', 'Anne Frank House']
    },
    {
      id: 'ayodhya',
      name: 'Ayodhya Spiritual Journey',
      destination: 'Ayodhya, India',
      duration: '3 Days / 2 Nights',
      price: 25000,
      image: 'https://source.unsplash.com/800x600/?ayodhya,temple',
      rating: 4.9,
      reviews: 567,
      highlights: ['Ram Mandir', 'Hanuman Garhi', 'Saryu Aarti', 'Kanak Bhawan']
    },
    {
      id: 'kerala',
      name: 'Kerala Backwaters & Beaches',
      destination: 'Kerala, India',
      duration: '5 Days / 4 Nights',
      price: 35000,
      image: 'https://source.unsplash.com/800x600/?kerala,backwaters',
      rating: 4.7,
      reviews: 432,
      highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Alleppey', 'Fort Kochi']
    },
    {
      id: 'dubai',
      name: 'Dubai Luxury Experience',
      destination: 'Dubai, UAE',
      duration: '5 Days / 4 Nights',
      price: 80000,
      image: 'https://source.unsplash.com/800x600/?dubai,burj-khalifa',
      rating: 4.9,
      reviews: 789,
      highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah']
    },
    {
      id: 'goa',
      name: 'Goa Beach Paradise',
      destination: 'Goa, India',
      duration: '4 Days / 3 Nights',
      price: 20000,
      image: 'https://source.unsplash.com/800x600/?goa,beach',
      rating: 4.6,
      reviews: 654,
      highlights: ['Beach Hopping', 'Water Sports', 'Nightlife', 'Portuguese Forts']
    },
    {
      id: 'thailand',
      name: 'Thailand Island Hopping',
      destination: 'Thailand',
      duration: '6 Days / 5 Nights',
      price: 60000,
      image: 'https://source.unsplash.com/800x600/?thailand,beach',
      rating: 4.8,
      reviews: 876,
      highlights: ['Phi Phi Islands', 'Grand Palace', 'Floating Market', 'Thai Massage']
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Holiday Packages</h1>
          <p className="text-xl">Curated travel experiences from Chhattisgarh to the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-56">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                  ₹{(pkg.price / 1000).toFixed(0)}K
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{pkg.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{pkg.destination}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Highlights:</p>
                  <ul className="space-y-1">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-gray-500">{pkg.reviews} reviews</span>
                  <button className="btn-primary text-sm px-4 py-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 mb-6">Let us create a custom package just for you!</p>
          <Link href="/itinerary" className="btn-primary inline-block">
            Create Custom Itinerary
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}