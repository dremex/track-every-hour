<script>
    import { activityTypes } from './stores.js'
</script>

<style>

</style>

<main>
    <h1>Activity Types</h1>

    {#each Object.entries($activityTypes) as [activityTypeId, activityType]}
        <p>{activityType.name}</p>
    {/each}
</main>