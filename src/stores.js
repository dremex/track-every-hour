import { writable } from 'svelte/store'
import { setupNewDate } from './helpers/utils'

export const currentDate = writable(setupNewDate())

export const activityTypes = writable({
    lastFetched: null,
    activityTypes: [],
})

export const activityStore = writable({
    activities: null,
    lastFetched: null,
})