<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
//use lang attribute set to "ts"
import { defineComponent } from 'vue'
import { EventItem } from '../types' //import custom defined types

//because TypeScript is unable to refer what @ means in the path, we use relative path explicitly “../components/” instead of using alias “@/components/”
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService'

//instead of just export default { ... }
//we need to use helper method defineComponent and explicitly export default defineComponent({ ... })
export default defineComponent({
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: [] as EventItem[] //use type assertion
    }
  },
  //for computed property is important what it is returning
  computed: {
    firstEvent(): EventItem {
      return this.events[0]
    }
  },
  //for methods there are 2 important things:
  // 1.Do we need to add types to the parameters being passed into the method
  // 2.Do we need to add types to whatever is being returned by the method
  methods: {
    addEvent(newEvent: EventItem): void {
      this.events.push(newEvent)
    },
    getFirstEvent(): EventItem {
      return this.events[0]
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
