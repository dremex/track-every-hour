<script>
  import { activityTypeStore } from '../../stores/activityStore.js'

  import ActivityType from './ActivityType.svelte'
</script>

<style>
  .activity-type-list {
    top: 130px;
  }
</style>

<main>
  <h1>Activity Types</h1>

  <div class="scrollable activity-type-list">
    {#each $activityTypeStore as activityType}
      <ActivityType
        {activityType}
        notes={`${activityType.usedThisWeek} hours this week`}
        on:activityTypeClicked={() => console.log('clicked')} />
    {/each}
  </div>
</main>
