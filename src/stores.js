import { writable } from 'svelte/store'
import { setupNewDate } from './helpers/utils'

export const activityTypes = writable([])
export const currentDate = writable(setupNewDate())