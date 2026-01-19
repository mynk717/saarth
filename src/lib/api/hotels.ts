import { HotelSearchParams, Hotel, ApiResponse } from '@/types'

// Mock hotel data for demonstration
export const searchHotels = async (
  params: HotelSearchParams
): Promise<ApiResponse<Hotel[]>> => {
  // This is a mock - replace with actual Booking.com or other hotel API
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockHotels: Hotel[] = [
      {
        id: '1',
        name: 'Grand Palace Hotel',
        location: params.destination,
        address: `123 Main Street, ${params.destination}`,
        rating: 4.5,
        reviews: 1234,
        price: 3500,
        currency: 'INR',
        images: ['/images/hotel1.jpg'],
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        description: 'Luxury hotel in the heart of the city',
        coordinates: { lat: 21.2514, lng: 81.6296 },
      },
      {
        id: '2',
        name: 'Comfort Inn & Suites',
        location: params.destination,
        address: `456 Park Avenue, ${params.destination}`,
        rating: 4.0,
        reviews: 856,
        price: 2200,
        currency: 'INR',
        images: ['/images/hotel2.jpg'],
        amenities: ['WiFi', 'Breakfast', 'Parking', 'AC'],
        description: 'Comfortable stay with modern amenities',
        coordinates: { lat: 21.2514, lng: 81.6296 },
      },
    ]

    return {
      success: true,
      data: mockHotels,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to search hotels',
    }
  }
}