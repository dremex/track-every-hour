<script>
  import { onMount } from 'svelte'

  import TimelineItem from './TimelineItem.svelte'
  import TimelineItemPlaceholder from './TimelineItemPlaceholder.svelte'
  import TimelineItemLoading from '../timeline/TimelineItemLoading.svelte'

  import { currentDate, currentWeek } from '../../stores/appStore.js'
  import { activityStore, activityTypes, timelineStore } from '../../stores/activityStore.js'

  import { formatDate } from '../../helpers/utils'
  import { DAYS, MONTHS } from '../../helpers/constants'

  import Swipe from 'swipejs'
  import { startOfWeek, endOfWeek } from 'date-fns'

  import firebase from '../../helpers/firebase'
  import 'firebase/database'

  let expandedBlock = null

  function buildSwipeConfig(startSlide) {
    return {
      draggable: true,
      continuous: false,
      stopPropagation: true,
      startSlide: startSlide,
      callback: function(index) {
        if (index === 0) {
          transitionWeek('PAST')
          return
        }

        if (index === 8) {
          transitionWeek('FUTURE')
          return
        }

        $currentDate = $currentWeek[index - 1]
      }
    }
  }

  function initSwiper() {
    if (window.mySwipe && window.mySwipe.kill) {
      window.mySwipe.kill()
    }

    var element = document.getElementById('slider')
    window.mySwipe = new Swipe(element, buildSwipeConfig($currentDate.getDay() + 1))
  }

  function handleDayChange(newDay) {
    $currentDate = newDay
    expandedBlock = null

    window.mySwipe.slide($currentDate.getDay() + 1)
  }

  async function transitionWeek(direction) {
    const newDayOffset = direction === 'PAST' ? -1 : 1
    const date = new Date($currentDate.getTime())
    date.setDate(date.getDate() + newDayOffset)

    $currentDate = date
    expandedBlock = null

    $activityStore = {
      lastFetched: new Date(),
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

    initSwiper()
  }

  onMount(() => initSwiper())
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

  .timeline {
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

  <div class="day-block">
    {#each $currentWeek as date, i}
      <div class={i == $currentDate.getDay() ? 'day active' : 'day'} on:click={() => handleDayChange(date)}>
        <span class="day-of-week">{DAYS[date.getDay()]}</span>
        <span class="day-of-month">{date.getDate()}</span>
      </div>
    {/each}
  </div>

  <div class="scrollable timeline">
    <div id="slider" class="swipe">
      <div class="swipe-wrap">
        <div>
          {#each Array(12) as _, i}
            <TimelineItemLoading />
          {/each}
        </div>
        {#each Object.keys($timelineStore) as day}
          <div>
            {#each $timelineStore[day] as timelineItem}
              {#if timelineItem.activities.length === 0}
                <TimelineItemPlaceholder
                  hour={timelineItem.startHour}
                  on:timelienItemPlaceholderClicked={() => (window.location = `#/activities/add/${day}/${timelineItem.startHour}`)} />
              {:else if timelineItem.activities.length === 1 || expandedBlock === timelineItem.startHour}
                {#each timelineItem.activities as activity}
                  <TimelineItem
                    startHour={activity.hour}
                    endHour={activity.hour}
                    activities={[activity]}
                    activityType={$activityTypes.activityTypes[activity.activityTypeId]}
                    on:timelineItemClicked={() => (window.location = `#/activities/edit/${day}/${activity.hour}`)} />
                {/each}
              {:else}
                <TimelineItem
                  startHour={timelineItem.startHour}
                  endHour={timelineItem.endHour}
                  activities={timelineItem.activities}
                  activityType={$activityTypes.activityTypes[timelineItem.activityTypeId]}
                  on:timelineItemClicked={() => (expandedBlock = timelineItem.startHour)} />
              {/if}
            {/each}
          </div>
        {/each}
        <div>
          {#each Array(12) as _, i}
            <TimelineItemLoading />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
