<script>
	/* 
		App life-cylce

		* Initial load:
			* Show app loading splash page
			* Fetch activity types
			* Save activity types to store
			* Render activity list component

		* Activity List:
			* List loading skeleton
			* Fetch activites from firebase
			* Render list of Activity components
	*/

	import { onMount } from 'svelte';
	import firebase from './helpers/firebase'
	import 'firebase/database'

	import { activityTypes } from './stores.js'

	import AddEditActivity from './AddEditActivity.svelte'
	import ActivityList from './ActivityList.svelte'
	import ActivityTypeList from './ActivityTypeList.svelte'
	
	let page = 'activities'

	export let appInitializing = true

	async function hashchange() {
		activityTypes.set(await firebase
			.database()
			.ref(`/activityTypes`)
			.orderByKey()
			.once('value')
			.then(function(snapshot) {
			return snapshot.val() || {}
		}))

		appInitializing = false

		const path = window.location.hash.slice(1)

		if (path.startsWith('/activityTypes')) {
			page = 'activityTypes'
		} else if (path.startsWith('/activities/add') || path.startsWith('/activities/edit')) {
			page = 'addActivity'
		} else {
			page = 'activities'
		}
	}

	onMount(hashchange)
</script>

<svelte:window on:hashchange={hashchange}/>

<div class='app-root'>
	{#if appInitializing}
		<p>APP LOADING</p>
	{:else}
		<a href="#/activities">Activities</a><br>
		<a href="#/activityTypes">Activity Types</a><hr>

		{#if page === 'activityTypes'}
			<ActivityTypeList />
		{:else if page === 'addActivity'}
			<AddEditActivity />
		{:else}
			<ActivityList />
		{/if}
	{/if}
</div>

<style>
	.app-root {
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 10px;
		margin: 0 auto;
	}
</style>