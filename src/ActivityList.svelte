<script>
	import { onMount } from 'svelte';
	import firebase from './helpers/firebase'
	import 'firebase/database'

	import { DAYS, MONTHS } from './helpers/constants'
	import { startOfWeek, endOfWeek } from 'date-fns'
	import { formatDate, formatHour, setupNewDate } from './helpers/utils'

	import { activityTypes, currentDate } from './stores.js'

	import Activity from './Activity.svelte';

	export let activities = {}
	export let activitesLoading = true

	async function componentMounted() {
		activities = await firebase
			.database()
			.ref(`/activities`)
			.orderByKey()
			.startAt(formatDate(startOfWeek($currentDate)))
			.endAt(formatDate(endOfWeek($currentDate)))
			.once('value')
			.then(function(snapshot) {
				return snapshot.val() || {}
			})

		console.log('activities', activities)

		activitesLoading = false
	}

	function buildDaysBar() {
		const days = []
		const date = new Date($currentDate.getTime())
		const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()))

		for (let i = 0; i < 7; i++) {
			let date = new Date(startOfWeek.getTime())
			date.setDate(date.getDate() + i)

			days.push(date)
		}

		return days
	}

	onMount(componentMounted)
</script>

<style>
	.day-block {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-bottom: 10px;
	}

	.day {
		cursor: pointer;
		color: #aaaaaa;
		text-align: center;
	}

	.active {
		color: #000000;
		font-weight: bold;
	}

	.day-of-month {
		display: block;
		margin-top: 5px;
	}
</style>

<main>
	<h2>{MONTHS[$currentDate.getMonth()]}</h2>

	{#if activitesLoading}
		<p>ACTIVITIES LOADING</p>
	{:else}
		<div class='day-block'>
			{#each buildDaysBar() as date, i}
				<div class='{i == $currentDate.getDay() ? 'day active' : 'day'}' on:click={() => $currentDate = date}>
					<span class='day-of-week'>{DAYS[date.getDay()]}</span>
					<span class='day-of-month'>{date.getDate()}</span>
				</div>
			{/each}
		</div>

		{#each Array(24) as _, i}
			{#if activities[formatDate($currentDate)] && activities[formatDate($currentDate)][i]}
				<Activity
					hour={formatHour(i)}
					notes={activities[formatDate($currentDate)][i].notes}
					activityType={$activityTypes[activities[formatDate($currentDate)][i].activityTypeId]}
				/>
			{:else}
				<li>{formatHour(i)}</li>
			{/if}
		{/each}
	{/if}
</main>