<script>
    import { currentDate } from './stores/appStore.js'
    import { activityStore, activityTypeStore } from './stores/activityStore.js'
    import firebase from './helpers/firebase'
    import 'firebase/database'
    
    import { onMount } from 'svelte'
    import Activity from './Activity.svelte'

    import { formatDate } from './helpers/utils'

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

        activityStore.deleteActivity(date, hour)

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

        activityStore.addActivity(date, hour, selectedActivityTypeId, notes)

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

        const formattedDate = formatDate($currentDate)
        if ($activityStore.activities[formattedDate] && $activityStore.activities[formattedDate][viewState.hour]) {
            const activity = $activityStore.activities[formattedDate] && $activityStore.activities[formattedDate][viewState.hour]

            notes = activity.notes
            selectedActivityTypeId = activity.activityTypeId
        }
	})
</script>

<style>

    .activity-type-list {
        top: 190px;
    }

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

    <div class='scrollable activity-type-list'>
        {#each $activityTypeStore as activityType}
            <Activity
                header={activityType.name}
                notes={`${activityType.usedThisWeek} hours this week`}
                activityType={{
                    ...activityType,
                    'color': activityType.id === selectedActivityTypeId ? activityType.color : 'EEECEC',
                }}
                on:activityClicked={() => handleActivityTypeSelected(activityType.id)}
            />
        {/each}
    </div>

    {#if viewState.action === 'edit'}
        <div id='deleteActivityButton' class='fab fab-small' on:click={() => handleDeleteActivity()}>
            <img src='/icons/delete.svg' alt='Delete Activity' />
        </div>
    {/if}

    <div id='saveActivityButton' class='fab fab-large' on:click={() => handleSaveActivity()}>
        <img src='/icons/save.svg' alt='Save Activity' />
    </div>
</main>