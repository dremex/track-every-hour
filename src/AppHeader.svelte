<script>
    export let atRoot

    function backButtonPressed() {
        if (atRoot) return

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
        margin: auto;
        color: #FFF;
        font-size: 20px;
        font-weight: 500;
        background: #3880FF;
        box-shadow: 0 1px 4px #333;
    }

    #top-navigation span {
        position: absolute;
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
        transform: scale(.5);
    }

    .hamburger:hover {
        opacity: 0.7;
    }

    .hamburger.is-active:hover {
        opacity: 0.7;
    }

    .hamburger.is-active .hamburger-inner,
    .hamburger.is-active .hamburger-inner::before,
    .hamburger.is-active .hamburger-inner::after {
        background-color: #FFF;
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

    .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
        width: 40px;
        height: 4px;
        background-color: #FFF;
        border-radius: 4px;
        position: absolute;
        transition-property: transform;
        transition-duration: 0.15s;
        transition-timing-function: ease;
    }

    .hamburger-inner::before, .hamburger-inner::after {
        content: "";
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

</style>

<nav id='top-navigation'>
    <div class='hamburger hamburger--arrow {atRoot ? '' : 'is-active'}' on:click={backButtonPressed}>
        <div class='hamburger-box'>
            <div class='hamburger-inner'></div>
        </div>
    </div>
    <span>Track Every Hour</span>
    <!-- <a href="#/activities">Activities</a><br>
    <a href="#/activityTypes">Activity Types</a><hr> -->
</nav>