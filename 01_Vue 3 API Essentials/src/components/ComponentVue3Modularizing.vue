<template>
  <div>Capacity: {{ capacity }}</div>  
  <button @click="increaseCapacity()">Increase Capacity</button>  
  <h2>Attending</h2>
  <ul>
    <li v-for="(name, index) in attending" :key="index">      
      {{ name }}
    </li>
  </ul>
  <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>  
</template>

<script>
// import { ref, computed } from "vue";

// function useEventSpace() {
//   const capacity = ref(4);
//   const attending = ref(["Tim", "Bob", "Joe"]);
//   const spacesLeft = computed(() => {
//     return capacity.value - attending.value.length;
//   });
//   function increaseCapacity() {
//     capacity.value++;
//   }
//   return { capacity, attending, spacesLeft, increaseCapacity };
// }

import useEventSpace from "../use/event-space";
//import useMapping from "../use/mapping";

export default {
  props: {
    name: String
  },  
  setup() {
    return useEventSpace();
    //return { ...useEventSpace(), ...useMapping() }
  }
};
</script>