import { NextRequest, NextResponse } from 'next/server'
import { searchHotels } from '@/lib/api/hotels'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await searchHotels(body)
    
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}