export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatPrice = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`
  }
  return `₹${amount}`
}

export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<number> => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    const data = await response.json()
    const rate = data.rates[to]
    return amount * rate
  } catch (error) {
    console.error('Currency conversion error:', error)
    return amount
  }
}