<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-card">
      <!-- here will be the content -->
      <slot />
    </div>
  </div>
</template>

<script>
  import { useKeydown } from '../composables/useKeydown';

  export default {
    setup({closeModal}){ //use destructuring of props
      //this approach wull register on.keydown for every use of useKeydown()
      //useKeydown('Escape', () => { emit('closeModal') })
      //useKeydown('Enter', () => { console.log('a different functin') })      

      //this approach will register on.keydown only once as register multiple shortcuts with just one instance of useKeydown
      useKeydown([ { key: 'Escape', fn: closeModal } ])
    },
    props: {
      closeModal: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>