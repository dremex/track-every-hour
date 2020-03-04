import { writable, derived } from 'svelte/store'
import { setupNewDate } from '../helpers/utils'

export const menuExpanded = writable(false)

export const currentDate = writable(setupNewDate())

export const currentWeek = derived(currentDate, $currentDate => {
  const days = []
  const date = new Date($currentDate.getTime())
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()))

  for (let i = 0; i < 7; i++) {
    let date = new Date(startOfWeek.getTime())
    date.setDate(date.getDate() + i)

    days.push(date)
  }

  return days
})
