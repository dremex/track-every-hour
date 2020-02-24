<script>
    import { activityTypes } from './stores.js'

    import Activity from './Activity.svelte'
</script>

<style>

</style>

<main>
    <h1>Activity Types</h1>

    {#each Object.entries($activityTypes.activityTypes) as [activityTypeId, activityType]}
        <Activity
            header={activityType.name}
            notes={'0 this week'}
            activityType={activityType}
            on:activityClicked={() => console.log('clicked')}
        />
    {/each}
</main>