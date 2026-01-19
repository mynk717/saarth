import { Weather, ApiResponse } from '@/types'

export const getWeather = async (city: string): Promise<ApiResponse<Weather>> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    return {
      success: false,
      error: 'Weather API key not configured',
    }
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )

    if (!response.ok) {
      throw new Error('Weather data fetch failed')
    }

    const data = await response.json()

    const weather: Weather = {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    }

    return {
      success: true,
      data: weather,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch weather',
    }
  }
}