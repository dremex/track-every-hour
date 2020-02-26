import { writable, derived } from 'svelte/store'
import { setupNewDate } from './helpers/utils'

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

export const activityTypes = writable({
    lastFetched: null,
    activityTypes: [],
})

export const activityStore = writable({
    activities: null,
    lastFetched: null,
})

export const activityTypeStore = derived([activityStore, activityTypes], ([$activityStore, $activityTypes]) => {
    if (!$activityStore.activities || !$activityTypes.activityTypes) return []

    const results = []

    Object.keys($activityTypes.activityTypes).forEach((activityTypeId) => {
        results.push({
            id: activityTypeId,
            usedThisWeek: 0,
            ...$activityTypes.activityTypes[activityTypeId],
        })
    })

    Object.keys($activityStore.activities).forEach((day) => {
        $activityStore.activities[day].forEach((activity) => {
            results.find(activityType => activityType.id === activity.activityTypeId).usedThisWeek++
        })
    })

    results.sort((a, b) => (a.usedThisWeek > b.usedThisWeek) ? -1 : 1)

    return results
})