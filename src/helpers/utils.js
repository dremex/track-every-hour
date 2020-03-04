import { format, startOfDay } from 'date-fns'

export function setupNewDate(date = new Date()) {
  return startOfDay(date)
}

export function formatDate(date = new Date()) {
  return format(date, 'yyyy-MM-dd')
}

export function formatHour(hour) {
  const suffix = hour >= 12 ? 'pm' : 'am'
  const formattedHour = ((hour + 11) % 12) + 1

  return formattedHour + ' ' + suffix
}
