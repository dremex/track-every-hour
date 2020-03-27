<script>
  import { createEventDispatcher } from 'svelte'

  import TimelineItemBase from './TimelineItemBase.svelte'

  import { formatHour } from '../../helpers/utils'

  export let startHour
  export let endHour
  export let activities
  export let activityType

  function buildNotes() {
    const notes = []

    activities.forEach(activity => {
      notes.push(activity.notes)
    })

    return notes.filter(function(value, index, self) {
      return self.indexOf(value) === index
    })
  }

  const dispatch = createEventDispatcher()
</script>

<style>
  .timeline-item-icon-label {
    margin: 0;
    display: flex;
    flex-basis: 32px;
    font-size: 1.07em;
    align-items: center;
    justify-content: center;
  }

  .timeline-item-icon-label-separator {
    left: 50%;
    flex: 2 1 0%;
    height: 100%;
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
    position: relative;
    border-left: 1px solid #000000;
  }

  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 2px;
    font-size: 14px;
    line-height: 20px;
    text-overflow: inherit;
    overflow: inherit;
    color: #666666;
  }
</style>

<div on:click={() => dispatch('timelineItemClicked')}>
  <TimelineItemBase activityCount={activities.length}>
    <div slot="icon" class="timeline-item-icon-container" style="background-color: #{activityType.color}">
      <img src="/icons/activityTypes/{activityType.icon}.svg" class="timeline-item-icon" alt={activityType.name} />
        <span class="timeline-item-icon-label">{formatHour(startHour)}</span>
        {#if activities.length > 1}
          <div class="timeline-item-icon-label-separator" />
          <span class="timeline-item-icon-label">{formatHour(endHour)}</span>
        {/if}
    </div>

    <div slot="content" class="timeline-item-content-container" style="background-color: #{activityType.colorAccent}">
      {#each buildNotes() as note}
        <p>{note}</p>
      {/each}
    </div>
  </TimelineItemBase>
</div>
