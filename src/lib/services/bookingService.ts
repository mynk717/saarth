import { Booking, Traveler } from '@/types'

export const createBooking = async (
  bookingData: Partial<Booking>
): Promise<{ success: boolean; bookingId?: string; error?: string }> => {
  try {
    // This would connect to your backend/database
    // For now, we'll simulate it
    const bookingId = `BK${Date.now()}`

    // Store in localStorage for demo purposes
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const newBooking: Booking = {
      id: bookingId,
      userId: bookingData.userId || 'guest',
      type: bookingData.type || 'flight',
      status: 'pending',
      details: bookingData.details as any,
      totalPrice: bookingData.totalPrice || 0,
      currency: bookingData.currency || 'INR',
      createdAt: new Date().toISOString(),
      travelers: bookingData.travelers || [],
    }

    existingBookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(existingBookings))

    return {
      success: true,
      bookingId,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create booking',
    }
  }
}

export const getBookings = (userId: string): Booking[] => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    return bookings.filter((b: Booking) => b.userId === userId)
  } catch (error) {
    return []
  }
}

export const getBookingById = (bookingId: string): Booking | null => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    return bookings.find((b: Booking) => b.id === bookingId) || null
  } catch (error) {
    return null
  }
}