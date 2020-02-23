<script>
    import { activityTypes } from './stores.js'
    import firebase from './helpers/firebase'
	import 'firebase/database'

    let notes = ''
    let selectedActivityType

    async function handleSaveActivity() {
        if (!selectedActivityType) return // TODO: Error toast
        if (!notes) return // TODO: Error toast

        const urlParams = window.location.hash.slice(1).split('/')
        // TODO: param verification (url has all params and of correct types)

        const action = urlParams[2]
        const date = urlParams[3]
        const hour = urlParams[4]

        await firebase.database().ref(`activities/${date}/${hour}`).set({
            notes,
            activityTypeId: selectedActivityType
        })

        console.log('saved!')
	}
</script>

<style>

</style>

<main>
    <h1>Add Activity</h1>

    {#each Object.entries($activityTypes) as [activityTypeId, activityType]}
        <label>
            <input type=radio bind:group={selectedActivityType} value={activityTypeId}>
            {activityType.name}
        </label>
    {/each}

    <label>
        Notes
        <input bind:value={notes}>
    </label>

    <button on:click={() => handleSaveActivity()}>Save</button>
</main>