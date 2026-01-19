// Flight Types
export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    city: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    city: string
    time: string
    date: string
  }
  duration: string
  stops: number
  price: number
  currency: string
  class: 'economy' | 'business' | 'first'
  availableSeats: number
}

export interface FlightSearchParams {
  from: string
  to: string
  departDate: string
  returnDate?: string
  adults: number
  children?: number
  infants?: number
  travelClass: 'economy' | 'business' | 'first'
}

// Hotel Types
export interface Hotel {
  id: string
  name: string
  location: string
  address: string
  rating: number
  reviews: number
  price: number
  currency: string
  images: string[]
  amenities: string[]
  description: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface HotelSearchParams {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

// Package Types
export interface Package {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  currency: string
  image: string
  description: string
  includes: string[]
  itinerary: ItineraryDay[]
  highlights: string[]
}

export interface ItineraryDay {
  day: number
  title: string
  activities: string[]
  meals: ('breakfast' | 'lunch' | 'dinner')[]
  accommodation?: string
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

// Booking Types
export interface Booking {
  id: string
  userId: string
  type: 'flight' | 'hotel' | 'package'
  status: 'pending' | 'confirmed' | 'cancelled'
  details: Flight | Hotel | Package
  totalPrice: number
  currency: string
  createdAt: string
  travelers: Traveler[]
}

export interface Traveler {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  passportNumber?: string
  passportExpiry?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Weather Types
export interface Weather {
  temp: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}