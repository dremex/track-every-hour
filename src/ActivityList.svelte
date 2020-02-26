<script>
	import { onMount } from 'svelte'

	import { DAYS, MONTHS } from './helpers/constants'
	import { startOfWeek, endOfWeek } from 'date-fns'
	import { formatDate, formatHour, setupNewDate } from './helpers/utils'

	import { activityStore, activityTypes, currentDate } from './stores.js'

	import Activity from './Activity.svelte';
	import Swipe from 'swipejs'

	let days = buildDaysBar()

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

	function handleDayChange(newDay) {
		$currentDate = newDay

		window.mySwipe.slide($currentDate.getDay())
	}

	onMount(() => {
		var element = document.getElementById('slider');
		window.mySwipe = new Swipe(element, {
			draggable: true,
			continuous: false,
			stopPropagation: true,
			startSlide: $currentDate.getDay(),
			callback: function(index, element) {
				$currentDate = days[index]
			}
		});
	})
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

	.activity-list {
		top: 170px;
	}

	.swipe {
		overflow: hidden;
		visibility: hidden;
		position: relative;
	}

	.swipe-wrap {
		overflow: hidden;
		position: relative;
	}

	.swipe-wrap > div {
		float: left;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

</style>

<div>
	<h2>{MONTHS[$currentDate.getMonth()]}</h2>

	<div class='day-block'>
		{#each days as date, i}
			<div class='{i == $currentDate.getDay() ? 'day active' : 'day'}' on:click={() => handleDayChange(date)}>
				<span class='day-of-week'>{DAYS[date.getDay()]}</span>
				<span class='day-of-month'>{date.getDate()}</span>
			</div>
		{/each}
	</div>

	<div class='scrollable activity-list'>
		<div id='slider' class='swipe'>
			<div class='swipe-wrap'>
				{#each days as day, dayIndex}
					<div>
						{#each Array(24) as _, i}
							{#if $activityStore.activities[formatDate(day)] && $activityStore.activities[formatDate(day)][i]}
								<Activity
									header={formatHour(i)}
									notes={$activityStore.activities[formatDate(day)][i].notes}
									activityType={$activityTypes.activityTypes[$activityStore.activities[formatDate(day)][i].activityTypeId]}
									on:activityClicked={() => window.location = `#/activities/edit/${formatDate(day)}/${i}`}
								/>
							{:else}
								<Activity
									header={formatHour(i)}
									notes={null}
									activityType={null}
									on:activityClicked={() => window.location = `#/activities/add/${formatDate(day)}/${i}`}
								/>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>