<script>

</script>

<style>
  .skeleton-box {
    display: inline-block;
    height: 65px;
    margin-top: 5px;
    border-radius: 10px;
    width: calc(100% - 24px);
    position: relative;
    overflow: hidden;
    background-color: #dddbdd;
  }

  .skeleton-box::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @-webkit-keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>

<div class="skeleton-box" />
