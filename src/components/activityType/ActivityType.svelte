<script>
  import { createEventDispatcher } from 'svelte'

  import TimelineItemBase from '../timeline/TimelineItemBase.svelte'

  export let notes
  export let activityType

  const dispatch = createEventDispatcher()
</script>

<style>
  h2 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 8px;
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
    color: #000;
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

<div on:click={() => dispatch('activityTypeClicked')}>
  <TimelineItemBase>
    <div slot="icon" class="timeline-item-icon-container" style="background-color: #{activityType.color}">
      <img src="/icons/activityTypes/{activityType.icon}.svg" class="timeline-item-icon" alt={activityType.name} />
    </div>

    <div slot="content" class="timeline-item-content-container" style="background-color: #{activityType.colorAccent}">
      <h2>{activityType.name}</h2>
      <p>{notes}</p>
    </div>
  </TimelineItemBase>
</div>
