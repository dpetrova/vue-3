import { ref } from "vue";

export default function usePromise(fn) { // fn is the actual API call
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);  
  const createPromise = async (...args) => { // ...args are any arguments that should be sent into the fn
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(...args); // passing through the SearchInput, items
      //console.log(results.value)
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { results, loading, error, createPromise };
}