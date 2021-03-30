<template>
  <div>
    Search for <input v-model="searchInput" />
    <div v-if="error">Uh oh .. {{ error }}</div> 
    <Suspense v-else>
      <template #default>
        <!-- Put component/components here, one or more of which makes an asychronous call -->      
        <div>
          <p>Number of found events: {{ results }}</p>
          <p>Loading: {{ loading }}</p>
          <p>Error: {{ error }}</p>          
        </div>   
      </template>
      <template #fallback>
        <!-- What to display while loading -->
        Loading...
      </template>
    </Suspense>
  </div>   
</template>

<script>
import { ref, onErrorCaptured } from "vue";
import {eventApi} from "../api/event";

export default {  
  //setup has two optional arguments: props, context(it has access to a bunch of useful data)
  async setup(props, context) {   
    const attending = ref(["Tim", "Bob", "Joe"]);
    const searchInput = ref("Tim");
    const results = ref(null);
    const loading = ref(false);
    const error = ref(null);

    onErrorCaptured((e) => {
      error.value = e;
      return true; //to prevent the error from propagating further
    });

    async function loadData(search) {
      loading.value = true;
      error.value = null;
      results.value = null;
      try {
        results.value = await eventApi.getEventCount(searchInput.value, attending.value);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }

    await loadData(searchInput)    
    
    return { attending, searchInput, results, loading, error };
  }
};
</script>