'use client'
import { motion } from 'framer-motion'
import { Plane, Globe, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Chhattisgarh se Duniya Tak 🌍
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Amsterdam, Ayodhya, Kerala - Wherever you dream, we make it happen!
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8" />
              <div className="text-left">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-primary-100">Destinations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8" />
              <div className="text-left">
                <p className="text-3xl font-bold">5000+</p>
                <p className="text-primary-100">Happy Travelers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8" />
              <div className="text-left">
                <p className="text-3xl font-bold">Raipur</p>
                <p className="text-primary-100">Based in CG</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </div>
  )
}