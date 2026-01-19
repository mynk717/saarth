import { FlightSearchParams, Flight, ApiResponse } from '@/types'

let accessToken: string | null = null
let tokenExpiry: number = 0

// Get Amadeus Access Token
const getAccessToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken
  }

  const apiKey = process.env.NEXT_PUBLIC_AMADEUS_API_KEY
  const apiSecret = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET

  if (!apiKey || !apiSecret) {
    throw new Error('Amadeus API credentials not configured')
  }

  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get access token')
    }

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = Date.now() + data.expires_in * 1000

    return accessToken as string
  } catch (error) {
    console.error('Amadeus auth error:', error)
    throw error
  }
}

// Search Flights
export const searchFlights = async (
  params: FlightSearchParams
): Promise<ApiResponse<Flight[]>> => {
  try {
    const token = await getAccessToken()

    const searchParams = new URLSearchParams({
      originLocationCode: params.from,
      destinationLocationCode: params.to,
      departureDate: params.departDate,
      adults: params.adults.toString(),
      travelClass: params.travelClass.toUpperCase(),
      nonStop: 'false',
      max: '10',
    })

    if (params.returnDate) {
      searchParams.append('returnDate', params.returnDate)
    }

    if (params.children) {
      searchParams.append('children', params.children.toString())
    }

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Flight search failed')
    }

    const data = await response.json()

    // Transform Amadeus data to our Flight type
    const flights: Flight[] = data.data.map((offer: any) => ({
      id: offer.id,
      airline: offer.validatingAirlineCodes[0],
      flightNumber: offer.itineraries[0].segments[0].number,
      departure: {
        airport: offer.itineraries[0].segments[0].departure.iataCode,
        city: offer.itineraries[0].segments[0].departure.iataCode,
        time: offer.itineraries[0].segments[0].departure.at,
        date: offer.itineraries[0].segments[0].departure.at.split('T')[0],
      },
      arrival: {
        airport: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.iataCode,
        city: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.iataCode,
        time: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at,
        date: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at.split('T')[0],
      },
      duration: offer.itineraries[0].duration,
      stops: offer.itineraries[0].segments.length - 1,
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      class: params.travelClass,
      availableSeats: offer.numberOfBookableSeats,
    }))

    return {
      success: true,
      data: flights,
    }
  } catch (error: any) {
    console.error('Flight search error:', error)
    return {
      success: false,
      error: error.message || 'Failed to search flights',
    }
  }
}

// Search Airports
export const searchAirports = async (keyword: string): Promise<ApiResponse<any[]>> => {
  try {
    const token = await getAccessToken()

    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Airport search failed')
    }

    const data = await response.json()

    return {
      success: true,
      data: data.data,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to search airports',
    }
  }
}