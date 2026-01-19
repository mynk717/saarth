'use client'
import { useState } from 'react'
import { Plane, Hotel, Package, Map } from 'lucide-react'
import Link from 'next/link'

type TabId = 'flights' | 'hotels' | 'packages' | 'itinerary'

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState<TabId>('flights')

  const tabs = [
    { id: 'flights' as TabId, name: 'Flights', icon: Plane, href: '/flights' },
    { id: 'hotels' as TabId, name: 'Hotels', icon: Hotel, href: '/hotels' },
    { id: 'packages' as TabId, name: 'Packages', icon: Package, href: '/packages' },
    { id: 'itinerary' as TabId, name: 'Custom Itinerary', icon: Map, href: '/itinerary' },
  ]

  const tabContent: Record<TabId, { title: string; description: string }> = {
    flights: {
      title: 'Find the Best Flights from Raipur',
      description: 'Search domestic and international flights with best prices'
    },
    hotels: {
      title: 'Discover Amazing Hotels Worldwide',
      description: 'Book hotels and resorts at your destination'
    },
    packages: {
      title: 'Curated Holiday Packages',
      description: 'Pre-designed packages for popular destinations'
    },
    itinerary: {
      title: 'Build Your Dream Journey',
      description: 'Let us create a personalized travel plan for you'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Quick Search CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            {tabContent[activeTab].title}
          </h3>
          <p className="text-gray-600 mb-6">
            {tabContent[activeTab].description}
          </p>
          <Link 
            href={tabs.find(t => t.id === activeTab)?.href || '/'}
            className="btn-primary inline-block"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  )
}