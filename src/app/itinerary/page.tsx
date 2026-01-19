'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { MapPin, Calendar, Users, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ItineraryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '',
    duration: '',
    travelers: 2,
    budget: '',
    preferences: '',
    interests: [] as string[]
  })

  const interestOptions = [
    'Adventure Sports',
    'Cultural Sites',
    'Beaches',
    'Mountains',
    'Wildlife',
    'Shopping',
    'Nightlife',
    'Food & Cuisine',
    'Photography',
    'Spiritual/Religious'
  ]

  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      })
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.destination) {
      toast.error('Please fill all required fields')
      return
    }

    toast.success('Request submitted! Our team will contact you within 24 hours.')
    console.log('Itinerary request:', formData)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Custom Itinerary</h1>
          <p className="text-xl">Tell us your dream vacation and we'll make it happen</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  placeholder="e.g., Amsterdam, Kerala, Dubai"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="7"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₹)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="50,000 - 1,00,000"
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Interests
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Preferences / Special Requests
              </label>
              <textarea
                value={formData.preferences}
                onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                rows={4}
                placeholder="Tell us more about your ideal vacation..."
                className="input-field"
              />
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Submit Request</span>
            </button>
          </form>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">500+ Destinations</h3>
            <p className="text-gray-600">We plan trips worldwide</p>
          </div>
          <div className="card text-center">
            <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Flexible Plans</h3>
            <p className="text-gray-600">Customize every detail</p>
          </div>
          <div className="card text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
            <p className="text-gray-600">Local Raipur experts</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}