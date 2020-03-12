<script>
  import { menuExpanded } from '../../stores/appStore.js'

  export let atRoot

  function handleNavIconClicked() {
    if (atRoot) {
      menuExpanded.set(!$menuExpanded)
      return
    }

    window.history.back()
    window.scrollTo(0, 0)

    // TODO:
    //  [ ] Update activity list (scrollable) css
    //  [ ] Make sure scroll to works
  }
</script>

<style>
  #top-navigation {
    width: 100%;
    min-height: 50px;
    margin: auto;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    background: #3880ff;
    box-shadow: 0 1px 4px #333;
  }

  #top-navigation a {
    color: #fff;
    position: absolute;
    text-decoration: none;
    top: 10px;
  }

  .hamburger {
    padding: 10px 0 10px 10px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
    transform: scale(0.5);
  }

  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: #fff;
  }

  .hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 40px;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  .hamburger-inner::before,
  .hamburger-inner::after {
    content: '';
    display: block;
  }

  .hamburger-inner::before {
    top: -10px;
  }

  .hamburger-inner::after {
    bottom: -10px;
  }

  .hamburger--arrow.is-active .hamburger-inner::before {
    transform: translate3d(-8px, 0, 0) rotate(-45deg) scale(0.7, 1);
  }

  .hamburger--arrow.is-active .hamburger-inner::after {
    transform: translate3d(-8px, 0, 0) rotate(45deg) scale(0.7, 1);
  }

  .hamburger--squeeze .hamburger-inner {
    transition-duration: 0.075s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--squeeze .hamburger-inner::before {
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
  }

  .hamburger--squeeze .hamburger-inner::after {
    transition: bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--squeeze.is-active .hamburger-inner {
    transform: rotate(45deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .hamburger--squeeze.is-active .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.075s ease, opacity 0.075s 0.12s ease;
  }

  .hamburger--squeeze.is-active .hamburger-inner::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  @media only screen and (min-width: 768px) {
    .hamburger {
      display: none;
    }

    #top-navigation a {
      left: 20px;
    }
  }
</style>

<nav id="top-navigation">
  <div
    class="hamburger {atRoot ? '' : 'hamburger--arrow is-active'}
    {$menuExpanded ? 'hamburger--squeeze is-active' : ''}"
    on:click={handleNavIconClicked}>
    <div class="hamburger-box">
      <div class="hamburger-inner" />
    </div>
  </div>
  <a href="/#/activities">Track Every Hour</a>
</nav>
