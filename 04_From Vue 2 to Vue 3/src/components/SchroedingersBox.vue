<template>  
  <!-- pass validation -->
  <div @click="$emit('peekedIntoTheBox', 'dead')">Dead</div> 
  <!-- pass validation -->
  <div @click="$emit('peekedIntoTheBox', 'alive')">Alive</div>
  <!-- pass validation -->
  <div @click="$emit('peekedIntoTheBox', 'both')">Both</div>
  <!-- fail validation -->
  <div @click="$emit('peekedIntoTheBox', 'not supported state')">Not supported state</div>
</template>

<script>
export default {
  components: {},
  setup() {},  
  //declare emits as simple array
  //emits: ['peekedIntoTheBox'] 
  //declare emits in object format, allows us to add a validator (or we can define it as null to avoid a validator)
  emits: {
    //peekedIntoTheBox: null
    peekedIntoTheBox: payload => {
      return ['dead', 'alive', 'both'].includes(payload)
    }
  }
}
</script>