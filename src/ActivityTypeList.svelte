<script>
    import { activityTypes } from './stores.js'

    import Activity from './Activity.svelte'
</script>

<style>

.activity-type-list {
    top: 130px;
}

</style>

<main>
    <h1>Activity Types</h1>

    <div class='scrollable activity-type-list'>
        {#each Object.entries($activityTypes.activityTypes) as [activityTypeId, activityType]}
            <Activity
                header={activityType.name}
                notes={'0 this week'}
                activityType={activityType}
                on:activityClicked={() => console.log('clicked')}
            />
        {/each}
    </div>
</main>