import { HotelSearchParams, Hotel, ApiResponse } from '@/types'

// Mock hotel data with real Unsplash images
export const searchHotels = async (
  params: HotelSearchParams
): Promise<ApiResponse<Hotel[]>> => {
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
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
        ],
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        description: 'Luxury hotel in the heart of the city with stunning views and world-class amenities',
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
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
        ],
        amenities: ['WiFi', 'Breakfast', 'Parking', 'AC'],
        description: 'Comfortable stay with modern amenities and excellent service',
        coordinates: { lat: 21.2514, lng: 81.6296 },
      },
      {
        id: '3',
        name: 'Royal Residency',
        location: params.destination,
        address: `789 Beach Road, ${params.destination}`,
        rating: 4.7,
        reviews: 2156,
        price: 4800,
        currency: 'INR',
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
        ],
        amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Beach Access', 'Spa'],
        description: 'Premium beachfront property with exceptional hospitality and breathtaking ocean views',
        coordinates: { lat: 21.2514, lng: 81.6296 },
      },
      {
        id: '4',
        name: 'Budget Stay Inn',
        location: params.destination,
        address: `321 Station Road, ${params.destination}`,
        rating: 3.8,
        reviews: 432,
        price: 1500,
        currency: 'INR',
        images: [
          'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
        ],
        amenities: ['WiFi', 'AC', 'Parking'],
        description: 'Affordable accommodation with clean rooms and friendly staff',
        coordinates: { lat: 21.2514, lng: 81.6296 },
      },
      {
        id: '5',
        name: 'Heritage Haveli Hotel',
        location: params.destination,
        address: `555 Heritage Street, ${params.destination}`,
        rating: 4.6,
        reviews: 987,
        price: 5200,
        currency: 'INR',
        images: [
          'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        ],
        amenities: ['WiFi', 'Restaurant', 'Traditional Decor', 'Gym', 'Room Service'],
        description: 'Experience royal heritage with traditional architecture and modern luxury',
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
