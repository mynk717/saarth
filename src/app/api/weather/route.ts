import { NextRequest, NextResponse } from 'next/server'
import { getWeather } from '@/lib/api/weather'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')

    if (!city) {
      return NextResponse.json(
        { success: false, error: 'City parameter required' },
        { status: 400 }
      )
    }

    const result = await getWeather(city)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}