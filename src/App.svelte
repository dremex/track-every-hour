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

	import AddActivity from './AddActivity.svelte'
	import ActivityList from './ActivityList.svelte'
	import ActivityTypes from './ActivityTypes.svelte'
	
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
		} else if (path.startsWith('/activities/add')) {
			page = 'addActivity'
		} else {
			page = 'activities'
		}
	}

	onMount(hashchange)
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
	{#if appInitializing}
		<p>APP LOADING</p>
	{:else}
		<a href="#/activities">Activities</a><br>
		<a href="#/activityTypes">Activity Types</a><hr>

		{#if page === 'activityTypes'}
			<ActivityTypes />
		{:else if page === 'addActivity'}
			<AddActivity />
		{:else}
			<ActivityList />
		{/if}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>