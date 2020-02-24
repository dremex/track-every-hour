<script>
	import { onMount } from 'svelte';
	import firebase from './helpers/firebase'
	import 'firebase/database'

	import { DAYS, MONTHS } from './helpers/constants'
	import { startOfWeek, endOfWeek } from 'date-fns'
	import { formatDate, formatHour, setupNewDate } from './helpers/utils'

	import { activityStore, activityTypes, currentDate } from './stores.js'

	import Activity from './Activity.svelte';

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
</script>

<style>
	h2 {
		margin-top: 18px;
		text-align: left;
		font-size: 24px;
	}

	.day-block {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-bottom: 20px;
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

<div>
	<h2>{MONTHS[$currentDate.getMonth()]}</h2>

	<div class='day-block'>
		{#each buildDaysBar() as date, i}
			<div class='{i == $currentDate.getDay() ? 'day active' : 'day'}' on:click={() => $currentDate = date}>
				<span class='day-of-week'>{DAYS[date.getDay()]}</span>
				<span class='day-of-month'>{date.getDate()}</span>
			</div>
		{/each}
	</div>

	{#each Array(24) as _, i}
		{#if $activityStore.activities[formatDate($currentDate)] && $activityStore.activities[formatDate($currentDate)][i]}
			<Activity
				header={formatHour(i)}
				notes={$activityStore.activities[formatDate($currentDate)][i].notes}
				activityType={$activityTypes.activityTypes[$activityStore.activities[formatDate($currentDate)][i].activityTypeId]}
				on:activityClicked={() => window.location = `#/activities/edit/${formatDate($currentDate)}/${i}`}
			/>
		{:else}
			<Activity
				header={formatHour(i)}
				notes={null}
				activityType={null}
				on:activityClicked={() => window.location = `#/activities/add/${formatDate($currentDate)}/${i}`}
			/>
		{/if}
	{/each}
</div>