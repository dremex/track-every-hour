<script>

  export let activityCount = 1

  function computeRowHeight() {
    const rowTopMargin = 5
    const singleRowHeight = 70

    return activityCount * singleRowHeight - rowTopMargin
  }

</script>

<style>
  .timeline-item {
    display: flex;
    width: calc(100% - 24px);
    margin-top: 5px;
    margin-left: 13px;
    border-radius: 10px;
    overflow: hidden;
  }

  @media only screen and (min-width: 768px) {
    .timeline-item {
      width: 100%;
      width: calc(100% - var(--side-menu-width-offset));
    }
  }
</style>

<div class="timeline-item" style="height: {computeRowHeight()}px;">
  <slot name="icon" />
  <slot name="content" />
</div>
