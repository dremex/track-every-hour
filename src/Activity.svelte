<script>
    import tinycolor from 'tinycolor2'
    import { formatDate, formatHour } from './helpers/utils'
    
    export let date
    export let hour
    export let notes
    export let activityType
</script>

<style>
  .row {
    display: flex;
    width: 100%;
    margin-top: 5px;
    border-radius: 10px;
    overflow: hidden;
  }

  .activity-row {
    height: 65px;
  }

  .placeholder-row {
    height: 50px;
  }

  .icon-container {
    width: 52px;
    align-items: center;
    display: flex;
    height: 100%;
  }

  .label {
    flex: 1;
    background: #eeecec;
    text-align: left;
    padding-left: 10px;
  }

  .icon {
    height: 100%;
    width: 32px;
    margin: 0 auto;
    display: block;
  }

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

  .placeholder {
    margin-top: 15px;
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

<div class='row {activityType ? 'activity-row' : 'placeholder-row'}' on:click={() => window.location = `#/activities/add/${formatDate(date)}/${hour}`}>
    {#if activityType}
      <div class='icon-container' style='background-color: #{activityType.color}'>
        <img src='/icons/{activityType.icon}.svg' class='icon' alt='{activityType.name}' />
      </div>
      <div class='label' style='background-color: {tinycolor(activityType.color).lighten(15).toString()}'>
        <h2>{formatHour(hour)}</h2>
        <p>{notes}</p>
      </div>
    {:else}
      <div class='label'>
          <h2 class='placeholder'>{formatHour(hour)}</h2>
      </div>
    {/if}
</div>