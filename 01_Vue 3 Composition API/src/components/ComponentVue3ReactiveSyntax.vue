<template>  
  <div>Capacity: {{ event.capacity }}</div>  
  <button @click="event.increaseCapacity()">Increase Capacity</button>
  <h2>Attending</h2>
  <ul>    
    <li v-for="(name, index) in event.attending" :key="index">
      {{ name }}
    </li>
  </ul>  
  <p>Spaces Left: {{ event.spacesLeft }} out of {{ event.capacity }}</p>
</template>

<script>
import { computed, reactive, toRefs } from "vue";

export default {
  props: {
    name: String
  },
  //setup has two optional arguments: props, context(it has access to a bunch of useful data)
  setup(props, context) {    
    //create a reactive object
    const event = reactive({
      capacity: 3,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length;
      }),
      increaseCapacity: () => event.capacity++
    })
    
    return { event };
    //return { ...toRefs(event) }; //destructuring event to can use its props directly in template (intsead of event.prop)
    //return toRefs(event)
  }
};
</script>