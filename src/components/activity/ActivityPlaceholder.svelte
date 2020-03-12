<script>
  import { createEventDispatcher } from 'svelte'
  import ActivityBase from './ActivityBase.svelte'

  import { formatHour } from '../../helpers/utils'

  export let day
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

<div on:click={() => dispatch('activityPlaceholderClicked')}>
  <ActivityBase>
    <div slot="content" class="activity-content-container">
      <h2 class="placeholder">{formatHour(hour)}</h2>
    </div>
  </ActivityBase>
</div>
