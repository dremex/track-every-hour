<script>
  import { activityTypeStore } from './stores/activityStore.js'

  import Activity from './Activity.svelte'
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
      <Activity
        header={activityType.name}
        notes={`${activityType.usedThisWeek} hours this week`}
        {activityType}
        on:activityClicked={() => console.log('clicked')} />
    {/each}
  </div>
</main>
