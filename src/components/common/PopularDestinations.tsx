import { MapPin } from 'lucide-react'

interface Destination {
  name: string
  country: string
  image: string
  price: string
  description: string
}

export default function PopularDestinations() {
  const destinations: Destination[] = [
    {
      name: 'Amsterdam',
      country: 'Netherlands',
      image: 'https://source.unsplash.com/800x600/?amsterdam,canal',
      price: '₹1,50,000',
      description: 'Canals, Museums & Tulips'
    },
    {
      name: 'Ayodhya',
      country: 'India',
      image: 'https://source.unsplash.com/800x600/?ayodhya,temple',
      price: '₹25,000',
      description: 'Spiritual Journey'
    },
    {
      name: 'Kerala',
      country: 'India',
      image: 'https://source.unsplash.com/800x600/?kerala,backwaters',
      price: '₹35,000',
      description: 'Backwaters & Beaches'
    },
    {
      name: 'Dubai',
      country: 'UAE',
      image: 'https://source.unsplash.com/800x600/?dubai,burj-khalifa',
      price: '₹80,000',
      description: 'Luxury & Adventure'
    },
    {
      name: 'Goa',
      country: 'India',
      image: 'https://source.unsplash.com/800x600/?goa,beach',
      price: '₹20,000',
      description: 'Sun, Sand & Party'
    },
    {
      name: 'Thailand',
      country: 'Thailand',
      image: 'https://source.unsplash.com/800x600/?thailand,phuket',
      price: '₹60,000',
      description: 'Temples & Islands'
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations from Raipur
          </h2>
          <p className="text-xl text-gray-600">
            Trending trips from Chhattisgarh travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="card overflow-hidden cursor-pointer group">
              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {destination.name}
              </h3>
              <p className="text-gray-600 mb-2">{destination.country}</p>
              <p className="text-sm text-gray-500 mb-4">{destination.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-xl">
                  Starting {destination.price}
                </span>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}