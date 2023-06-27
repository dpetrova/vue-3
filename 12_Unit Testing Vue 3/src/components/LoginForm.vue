<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="name" data-testid="name-input"/>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  //the events that the component emits can now be defined with the emits option:
  emits: [
    'formSubmitted'
  ],
  methods: {
    onSubmit() {
      this.$emit('formSubmitted', { name: this.name })
    }
  }
}
</script>
