'use client'
import { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields')
      return
    }

    toast.success('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We're here to help plan your perfect journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
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
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="How can we help?"
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    placeholder="Tell us about your travel plans..."
                    className="input-field"
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Office Address</p>
                    <p className="text-gray-600">Raipur, Chhattisgarh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@saarthholidays.com" className="text-blue-600 hover:underline">
                      info@saarthholidays.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <MessageCircle className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp Us</h3>
              <p className="mb-4 text-green-50">Get instant responses on WhatsApp</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold inline-block hover:bg-green-50 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}