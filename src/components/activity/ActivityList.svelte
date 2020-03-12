<script>
  import { onMount } from 'svelte'

  import Activity from './Activity.svelte'
  import ActivityPlaceholder from './ActivityPlaceholder.svelte'
  import ActivitySkeleton from '../loadingSkeletons/ActivitySkeleton.svelte'

  import { currentDate, currentWeek } from '../../stores/appStore.js'
  import { activityStore, activityTypes } from '../../stores/activityStore.js'

  import { formatDate } from '../../helpers/utils'
  import { DAYS, MONTHS } from '../../helpers/constants'

  import Swipe from 'swipejs'
  import { startOfWeek, endOfWeek } from 'date-fns'

  import firebase from '../../helpers/firebase'
  import 'firebase/database'

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

    window.mySwipe.slide($currentDate.getDay() + 1)
  }

  async function transitionWeek(direction) {
    const newDayOffset = direction === 'PAST' ? -1 : 1
    const date = new Date($currentDate.getTime())
    date.setDate(date.getDate() + newDayOffset)

    $currentDate = date

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

  <div class="day-block">
    {#each $currentWeek as date, i}
      <div class={i == $currentDate.getDay() ? 'day active' : 'day'} on:click={() => handleDayChange(date)}>
        <span class="day-of-week">{DAYS[date.getDay()]}</span>
        <span class="day-of-month">{date.getDate()}</span>
      </div>
    {/each}
  </div>

  <div class="scrollable activity-list">
    <div id="slider" class="swipe">
      <div class="swipe-wrap">
        <div>
          {#each Array(12) as _, i}
            <ActivitySkeleton />
          {/each}
        </div>
        {#each $currentWeek as day, dayIndex}
          <div>
            {#each Array(24) as _, i}
              {#if $activityStore.activities[formatDate(day)] && $activityStore.activities[formatDate(day)][i]}
                <Activity
                  hour={i}
                  notes={$activityStore.activities[formatDate(day)][i].notes}
                  activityType={$activityTypes.activityTypes[$activityStore.activities[formatDate(day)][i].activityTypeId]}
                  on:activityClicked={() => (window.location = `#/activities/edit/${formatDate(day)}/${i}`)} />
              {:else}
                <ActivityPlaceholder
                  hour={i}
                  day={formatDate(day)}
                  on:activityPlaceholderClicked={() => (window.location = `#/activities/add/${formatDate(day)}/${i}`)} />
              {/if}
            {/each}
          </div>
        {/each}
        <div>
          {#each Array(12) as _, i}
            <ActivitySkeleton />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
