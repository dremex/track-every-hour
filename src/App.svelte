<script>
  import { onMount } from 'svelte'
  import firebase from './helpers/firebase'
  import 'firebase/database'

  import { startOfWeek, endOfWeek } from 'date-fns'
  import { formatDate } from './helpers/utils'

  import { currentDate } from './stores/appStore.js'
  import { activityTypes, activityStore } from './stores/activityStore.js'

  import AppHeader from './AppHeader.svelte'
  import AppMenu from './AppMenu.svelte'
  import MutateActivity from './MutateActivity.svelte'
  import ActivityList from './ActivityList.svelte'
  import ActivityTypeList from './ActivityTypeList.svelte'

  let page = 'activities'

  export let appInitializing = true

  async function initialize() {
    if (!$activityTypes.lastFetched) {
      activityTypes.set({
        lastFetched: new Date(),
        activityTypes: await firebase
          .database()
          .ref(`/activityTypes`)
          .orderByKey()
          .once('value')
          .then(function(snapshot) {
            return snapshot.val() || []
          })
      })
    }

    if (!$activityStore.lastFetched) {
      activityStore.set({
        lastFetched: new Date(),
        activities: await firebase
          .database()
          .ref(`/activities`)
          .orderByKey()
          .startAt(formatDate(startOfWeek($currentDate)))
          .endAt(formatDate(endOfWeek($currentDate)))
          .once('value')
          .then(function(snapshot) {
            return snapshot.val() || {}
          })
      })
    }

    onHashChange()

    appInitializing = false
  }

  function onHashChange() {
    const path = window.location.hash.slice(1)

    if (path.startsWith('/activityTypes')) {
      page = 'activityTypes'
    } else if (path.startsWith('/activities/add') || path.startsWith('/activities/edit')) {
      page = 'addActivity'
    } else {
      page = 'activities'
    }
  }

  onMount(initialize)
</script>

<style>
  .app-content {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    margin: 0 auto;
  }

  @media only screen and (min-width: 768px) {
    .app-content {
      width: calc(100% - var(--side-menu-width-offset));
      margin-left: var(--side-menu-width);
    }
  }
</style>

<svelte:window on:hashchange={onHashChange} />

<div class="app-root">
  {#if appInitializing}
    <p>APP LOADING</p>
  {:else}
    <AppHeader atRoot={page === 'activities'} />
    <AppMenu />

    <div class="app-content">
      {#if page === 'activityTypes'}
        <ActivityTypeList />
      {:else if page === 'addActivity'}
        <MutateActivity />
      {:else}
        <ActivityList />
      {/if}
    </div>
  {/if}
</div>
