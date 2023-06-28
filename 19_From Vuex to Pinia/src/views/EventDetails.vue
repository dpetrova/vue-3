<template>
  <div v-if="eventStore.event">
    <h1>{{ eventStore.event.title }}</h1>
    <p>
      {{ eventStore.event.time }} on {{ eventStore.event.date }} @
      {{ eventStore.event.location }}
    </p>
    <p>{{ eventStore.event.description }}</p>
  </div>
</template>

<script>
import { useEventStore } from '../store/EventStore'

export default {
  props: ['id'],
  setup() {
    const eventStore = useEventStore()

    return {
      eventStore
    }
  },
  created() {
    this.eventStore.fetchEvent(this.id).catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  }
}
</script>
