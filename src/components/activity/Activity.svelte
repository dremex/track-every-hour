<script>
  import { createEventDispatcher } from 'svelte'

  import ActivityBase from './ActivityBase.svelte'

  import { formatHour } from '../../helpers/utils'

  export let hour
  export let notes
  export let activityType

  const dispatch = createEventDispatcher()
</script>

<style>
  .icon-label {
    display: flex;
    flex-grow: 1;
    font-size: 14px;
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

<div on:click={() => dispatch('activityClicked')}>
  <ActivityBase>
    <div slot="icon" class="activity-icon-container" style="background-color: #{activityType.color}">
      <img src="/icons/activityTypes/{activityType.icon}.svg" class="activity-icon" alt={activityType.name} />
      <span class="icon-label">{formatHour(hour)}</span>
    </div>

    <div slot="content" class="activity-content-container" style="background-color: #{activityType.colorAccent}">
      <p>{notes}</p>
    </div>
  </ActivityBase>
</div>
