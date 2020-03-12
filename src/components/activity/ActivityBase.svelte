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

  @media only screen and (min-width: 768px) {
    .row {
      width: 100%;
      width: calc(100% - var(--side-menu-width-offset));
    }
  }
</style>

<div class="row">
  <slot name="icon" />
  <slot name="content" />
</div>
