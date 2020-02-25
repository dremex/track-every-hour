<script>
	import { onMount } from 'svelte';
	import firebase from './helpers/firebase'
	import 'firebase/database'

	import { startOfWeek, endOfWeek } from 'date-fns'
	import { formatDate, formatHour } from './helpers/utils'

	import { activityTypes, activityStore, currentDate } from './stores.js'

	import AppHeader from './AppHeader.svelte'
	import AddEditActivity from './AddEditActivity.svelte'
	import ActivityList from './ActivityList.svelte'
	import ActivityTypeList from './ActivityTypeList.svelte'
	
	let page = 'activities'

	export let appInitializing = true

	async function hashchange() {
		if (!$activityTypes.lastFetched) {
			$activityTypes = {
				'lastFetched': new Date(),
				'activityTypes': await firebase
					.database()
					.ref(`/activityTypes`)
					.orderByKey()
					.once('value')
					.then(function(snapshot) {
					return snapshot.val() || []
				})
			}
		}

		if (!$activityStore.lastFetched) {
			$activityStore = {
				'lastFetched': new Date(),
				activities: await firebase
					.database()
					.ref(`/activities`)
					.orderByKey()
					.startAt(formatDate(startOfWeek($currentDate)))
					.endAt(formatDate(endOfWeek($currentDate)))
					.once('value')
					.then(function(snapshot) {
						return snapshot.val() || {}
					})
			}
		}

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
		<AppHeader atRoot={page === 'activities'} />

		<div class='app-content'>
			{#if page === 'activityTypes'}
				<ActivityTypeList />
			{:else if page === 'addActivity'}
				<AddEditActivity />
			{:else}
				<ActivityList />
			{/if}
		</div>
	{/if}
</div>

<style>
	.app-content {
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 10px;
		margin: 0 auto;
	}
</style>