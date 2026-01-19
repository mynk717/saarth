import { format, parseISO, differenceInDays, addDays } from 'date-fns'

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export const formatTime = (time: string): string => {
  return format(parseISO(time), 'hh:mm a')
}

export const getDaysBetween = (start: string | Date, end: string | Date): number => {
  const startDate = typeof start === 'string' ? parseISO(start) : start
  const endDate = typeof end === 'string' ? parseISO(end) : end
  return differenceInDays(endDate, startDate)
}

export const addDaysToDate = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addDays(dateObj, days)
}

export const getTodayDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd')
}

export const formatDateForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

export const calculateDuration = (start: string, end: string): string => {
  const startTime = parseISO(start)
  const endTime = parseISO(end)
  const diff = differenceInDays(endTime, startTime)
  
  if (diff < 1) {
    const hours = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))
    const minutes = Math.floor(((endTime.getTime() - startTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }
  
  return `${diff} days`
}