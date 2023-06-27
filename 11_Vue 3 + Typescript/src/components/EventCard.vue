<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <span>@{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script lang="ts">
//in Vue 3, when we want to apply custom types to props, we need the built-in helper method called PropTypes (use “Generics” dynamic types)
import { defineComponent, PropType } from 'vue'
import { EventItem } from '../types' //import custom defined type

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<EventItem>, //PropType helper method utilizes Generics in order to provide us the benefits of both prop validation and custom types
      required: true
    }
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
