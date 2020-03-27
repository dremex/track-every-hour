<script>
  import { createEventDispatcher } from 'svelte'
  import TimelineItemBase from './TimelineItemBase.svelte'

  import { formatHour } from '../../helpers/utils'

  export let hour

  const dispatch = createEventDispatcher()
</script>

<style>
  .placeholder {
    width: 100%;
    text-align: center;
    color: #8e8d8d;
    margin-top: 15px;
  }
</style>

<div on:click={() => dispatch('timelienItemPlaceholderClicked')}>
  <TimelineItemBase>
    <div slot="content" class="timeline-item-content-container">
      <h2 class="placeholder">{formatHour(hour)}</h2>
    </div>
  </TimelineItemBase>
</div>
