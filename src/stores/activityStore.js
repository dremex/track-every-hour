import { writable, derived } from 'svelte/store'

function createActivityStore() {
  const { subscribe, set, update } = writable({
    activities: null,
    lastFetched: null
  })

  const addActivity = (date, hour, activityTypeId, notes) =>
    update(n => {
      const activities = JSON.parse(JSON.stringify(n.activities))

      if (!activities[date]) {
        activities[date] = []
      }

      activities[date][hour] = {
        notes,
        activityTypeId
      }

      return (n = {
        activities: activities,
        lastFetched: n.lastFetched
      })
    })

  const deleteActivity = (date, hour) =>
    update(n => {
      const activities = JSON.parse(JSON.stringify(n.activities))
      delete activities[date][hour]

      return (n = {
        activities: activities,
        lastFetched: n.lastFetched
      })
    })

  return {
    set,
    subscribe,
    addActivity,
    deleteActivity
  }
}

export const activityStore = createActivityStore()

export const activityTypes = writable({
  lastFetched: null,
  activityTypes: []
})

export const activityTypeStore = derived([activityStore, activityTypes], ([$activityStore, $activityTypes]) => {
  if (!$activityStore.activities || !$activityTypes.activityTypes) return []

  const results = []

  Object.keys($activityTypes.activityTypes).forEach(activityTypeId => {
    results.push({
      id: activityTypeId,
      usedThisWeek: 0,
      ...$activityTypes.activityTypes[activityTypeId]
    })
  })

  Object.keys($activityStore.activities).forEach(day => {
    $activityStore.activities[day].forEach(activity => {
      if (!activity) return
      results.find(activityType => activityType.id === activity.activityTypeId).usedThisWeek++
    })
  })

  results.sort((a, b) => (a.usedThisWeek > b.usedThisWeek ? -1 : 1))

  return results
})
