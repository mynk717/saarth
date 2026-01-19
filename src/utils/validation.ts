export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const regex = /^[6-9]\d{9}$/
  return regex.test(phone.replace(/\s/g, ''))
}

export const validatePassport = (passport: string): boolean => {
  const regex = /^[A-Z]\d{7}$/
  return regex.test(passport.toUpperCase())
}

export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

export const validateFutureDate = (date: string): boolean => {
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj >= today
}