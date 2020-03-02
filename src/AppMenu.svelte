<script>
    import { menuExpanded } from './stores/appStore.js'

    function handleMenuItemClick() {
        menuExpanded.set(!$menuExpanded)
    }
</script>

<style>

    .sidenav {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 50;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 10px;
        transition: 0.2s;
    }

    .active {
        width: var(--side-menu-width);
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    @media only screen and (min-width: 768px) {
        .sidenav {
            width: var(--side-menu-width);
        }
    }

</style>

<div class='sidenav {$menuExpanded ? 'active' : ''}'>
    <a href='#/activityTypes' on:click={() => handleMenuItemClick()}>Activity Types</a>

    Reports
    <a href='#/reports/weekly' on:click={() => handleMenuItemClick()}>Weekly</a>
</div>