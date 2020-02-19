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
		} else {
			page = 'activities'
		}
	}

	onMount(hashchange)
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
	<a href="#/activities">Activities</a><br>
	<a href="#/activityTypes">Activity Types</a><hr>

	{#if appInitializing}
		<p>APP LOADING</p>
	{:else if page === 'activityTypes'}
		<ActivityTypes />
	{:else}
		<ActivityList />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>