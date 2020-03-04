<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let header
  export let notes
  export let activityType
</script>

<style>
  .row {
    display: flex;
    height: 65px;
    width: calc(100% - 24px);
    margin-top: 5px;
    margin-left: 13px;
    border-radius: 10px;
    overflow: hidden;
  }

  .icon-container {
    min-width: 52px;
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

  @media only screen and (min-width: 768px) {
    .row {
      width: 100%;
      width: calc(100% - var(--side-menu-width-offset));
    }
  }
</style>

<div class="row" on:click={() => dispatch('activityClicked')}>
  {#if activityType}
    <div class="icon-container" style="background-color: #{activityType.color}">
      <img src="/icons/activityTypes/{activityType.icon}.svg" class="icon" alt={activityType.name} />
    </div>
    <div class="label" style="background-color: #{activityType.colorAccent}">
      <h2>{header}</h2>
      <p>{notes}</p>
    </div>
  {:else}
    <div class="label">
      <h2 class="placeholder">{header}</h2>
    </div>
  {/if}
</div>
