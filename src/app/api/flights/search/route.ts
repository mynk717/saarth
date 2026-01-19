import { NextRequest, NextResponse } from 'next/server'
import { searchFlights } from '@/lib/api/amadeus'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await searchFlights(body)
    
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}