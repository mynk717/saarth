import { Package } from '@/types'
import { POPULAR_DESTINATIONS } from '@/config/constants'

export const getAllPackages = (): Package[] => {
  return POPULAR_DESTINATIONS.map((dest) => ({
    id: dest.id,
    name: `${dest.name} ${dest.duration} Package`,
    destination: dest.name,
    duration: dest.duration,
    price: dest.price,
    currency: dest.currency,
    image: dest.image,
    description: dest.description,
    includes: [
      'Return flights from Raipur',
      'Hotel accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Sightseeing tours',
    ],
    itinerary: generateItinerary(dest.highlights),
    highlights: dest.highlights,
  }))
}

export const getPackageById = (id: string): Package | null => {
  const packages = getAllPackages()
  return packages.find((pkg) => pkg.id === id) || null
}

const generateItinerary = (highlights: string[]) => {
  return highlights.map((highlight, index) => ({
    day: index + 1,
    title: `Day ${index + 1}: ${highlight}`,
    activities: [highlight, 'Local exploration', 'Free time'],
    meals: ['breakfast', 'dinner'] as ('breakfast' | 'lunch' | 'dinner')[],
    accommodation: 'Hotel',
  }))
}