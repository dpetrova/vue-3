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
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <!-- <p>Number of found events: {{ results }}</p>
      <p>Loading: {{ loading }}</p>
      <p>Error: {{ error }}</p> -->
      <p>Number of found events: {{ getEvents.results.value }}</p>
      <p>Loading: {{ getEvents.loading.value }}</p>
      <p>Error: {{ getEvents.error.value }}</p>      
    </div>
  </div>  
</template>

<script>
import { ref, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from "vue";
import {eventApi} from "../api/event";
import usePromise from "../composables/use-promise";

export default {
  props: {
    name: String
  },
  //setup has two optional arguments: props, context(it has access to a bunch of useful data)
  setup(props, context) {
    /* DATA */
    //create a Reactive Reference
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"]);
    const searchInput = ref("");
    // const results = ref(null);
    // const loading = ref(false);
    // const error = ref(null);


    /* COMPUTED PROPERTIES */
    const spacesLeft = computed(() => {
      return capacity.value - attending.value.length;
    });


    /* METHODS */
    function increaseCapacity() { 
      //increment the inner integer value our Reactive Reference encapsulates
      capacity.value++      
    }
    // async function loadData(search) {
    //   loading.value = true;
    //   error.value = null;
    //   results.value = null;
    //   try {
    //     results.value = await eventApi.getEventCount(search.value, attending.value);
    //   } catch (err) {
    //     error.value = err;
    //   } finally {
    //     loading.value = false;
    //   }
    // }
    const getEvents = usePromise(async (search, items) =>
      await eventApi.getEventCount(search.value, items.value)
    );
    

    /* WATCHER */
    //re-run this function on next tick when any of reactive references change  
    // watch(() => {
    //   results.value = eventApi.getEventCount(searchInput.value, attending.value)
    // });
    //specify what triggers the watcher to run
    watch(searchInput, (newVal, oldVal) => {
      console.log(newVal)
      console.log(oldVal)      
      //results.value = eventApi.getEventCount(searchInput.value, attending.value)
      if (searchInput.value !== "") {
        //loadData(searchInput);
        getEvents.createPromise(searchInput, attending);
      } else {
        //results.value = null;
        getEvents.results.value = null;
      }
    });
    //watch more than one reactive references
    // watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
    //   console.log(newFirst)
    //   console.log( newLast) 
    //   console.log(oldFirst)
    //   console.log( oldLast)  
    // });
    

    /* CONTEXT PROPERTIES */
    // context.attrs;
    // context.slots;
    // context.parent;
    // context.root;
    // context.emit;


    /* LIFE HOOKS */
    onBeforeMount(() => {
      console.log("Before Mount!");
    });
    onMounted(() => {
      console.log("Mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Before Update!");
    });
    onUpdated(() => {
      console.log("Updated!");
    });
    onBeforeUnmount(() => {
      console.log("Before Unmount!");
    });
    onUnmounted(() => {
      console.log("Unmounted!");
    });
    onActivated(() => {
      console.log("Activated!");
    });
    onDeactivated(() => {
      console.log("Deactivated!");
    });
    onErrorCaptured(() => {
      console.log("Error Captured!");
    });

    //returning data, computed properties, methods,.. to give our component access to them
    return { capacity, attending, increaseCapacity, spacesLeft, searchInput, getEvents };
    //return { capacity, attending, increaseCapacity, spacesLeft, searchInput, results, loading, error };    
  }
};
</script>