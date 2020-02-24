<script>
    import { activityStore, activityTypes } from './stores.js'
    import firebase from './helpers/firebase'
    import 'firebase/database'
    
    import Activity from './Activity.svelte'

    let notes = ''
    let selectedActivityTypeId = ''

    window.scrollTo(0, 0)

    function handleActivityTypeSelected(activityTypeId) {
        selectedActivityTypeId = activityTypeId
    }

    async function handleSaveActivity() {
        if (!selectedActivityTypeId) return // TODO: Error toast

        const urlParams = window.location.hash.slice(1).split('/')
        // TODO: param verification (url has all params and of correct types - maybe do this in onMount)

        const action = urlParams[2]
        const date = urlParams[3]
        const hour = urlParams[4]

        await firebase.database().ref(`activities/${date}/${hour}`).set({
            notes,
            activityTypeId: selectedActivityTypeId
        })

        const activities = JSON.parse(JSON.stringify($activityStore.activities))

        if (!activities[date]) {
            activities[date] = []
        }

        activities[date][hour] = {
            notes,
            activityTypeId: selectedActivityTypeId,
        }

        $activityStore.activities = activities

        // TODO: Success Toast
        console.log('saved!')

        window.location = '#/activities/'
	}
</script>

<style>
    .fab {
        width: 60px;
        height: 60px;
        background-color: #3880ff;
        border-radius: 50%;
        box-shadow: 0 6px 10px 0 #666;
        transition: all 0.1s ease-in-out;
        font-size: 32px;
        text-align: center;
        line-height: 60px;
        position: fixed;
        right: 25px;
        bottom: 20px;
    }

    .fab:hover {
        box-shadow: 0 6px 14px 0 #666;
        transform: scale(1.05);
    }
</style>

<main>
    <h1>CRUD Activity</h1>

    <input bind:value={notes} placeholder='Optional Notes'>

    {#each Object.entries($activityTypes) as [activityTypeId, activityType]}
        <Activity
            header={activityType.name}
            notes={'0 this week'}
            activityType={{
                ...activityType,
                'color': activityTypeId === selectedActivityTypeId ? activityType.color : 'EEECEC',
            }}
            on:activityClicked={() => handleActivityTypeSelected(activityTypeId)}
        />
    {/each}

    <div class='fab' on:click={() => handleSaveActivity()}>
        <img src='/icons/save.svg' alt='Save Activity' />
    </div>
</main>