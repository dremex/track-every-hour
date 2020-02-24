<script>
    import { activityStore, activityTypes } from './stores.js'
    import firebase from './helpers/firebase'
    import 'firebase/database'
    
    import { onMount } from 'svelte'
    import Activity from './Activity.svelte'

    let notes = ''
    let viewState = {}
    let selectedActivityTypeId = ''

    window.scrollTo(0, 0)

    function handleActivityTypeSelected(activityTypeId) {
        selectedActivityTypeId = activityTypeId
    }

    async function handleDeleteActivity() {
        // TODO: Show confirm modal

        const { date, hour } = viewState

        await firebase.database().ref(`activities/${date}/${hour}`).remove()

        const activities = JSON.parse(JSON.stringify($activityStore.activities))
        delete activities[date][hour]

        $activityStore.activities = activities

        // TODO: Success Toast
        console.log('deleted!')

        window.location = '#/activities/'
    }

    async function handleSaveActivity() {
        if (!selectedActivityTypeId) {
            // TODO: Error toast
            console.error('missing activity type')
            return
        }

        const { date, hour } = viewState

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

    onMount(() => {
		const urlParams = window.location.hash.slice(1).split('/')
        // TODO: param verification (url has all params and of correct types)

        viewState = {
            'action': urlParams[2],
            'date': urlParams[3],
            'hour': urlParams[4]
        }
	})
</script>

<style>
    .fab {
        border-radius: 50%;
        box-shadow: 0 6px 10px 0 #666;
        transition: all 0.1s ease-in-out;
        text-align: center;
        position: fixed;
    }

    .fab:hover {
        box-shadow: 0 6px 14px 0 #666;
        transform: scale(1.05);
    }

    .fab-small {
        right: 30px;
        width: 40px;
        height: 40px;
        font-size: 26px;
        line-height: 40px;
    }

    .fab-large {
        right: 25px;
        width: 50px;
        height: 50px;
        font-size: 30px;
        line-height: 50px;
    }

    #saveActivityButton {
        bottom: 20px;
        background-color: #3880ff;
    }

    #deleteActivityButton {
        bottom: 80px;
        background-color: red;
    }
</style>

<main>
    <h1>CRUD Activity</h1>

    <input bind:value={notes} placeholder='Optional Notes'>

    {#each Object.entries($activityTypes.activityTypes) as [activityTypeId, activityType]}
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

    {#if viewState.action === 'edit'}
        <div id='deleteActivityButton' class='fab fab-small' on:click={() => handleDeleteActivity()}>
            <img src='/icons/delete.svg' alt='Delete Activity' />
        </div>
    {/if}

    <div id='saveActivityButton' class='fab fab-large' on:click={() => handleSaveActivity()}>
        <img src='/icons/save.svg' alt='Save Activity' />
    </div>
</main>