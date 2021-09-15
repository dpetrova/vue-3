<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'], //inject the Global Store (gives our component access to GStore)
  methods: {
    register() {
      // If registration API call is successful push back (redirect0 to the event details

      // Set a flash message to appear on the next page loaded and after 3 seconds remove it
      this.GStore.flashMessage = 'You are successfully registered for ' + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      //push
      this.$router.push({
        name: 'EventDetails',
        //params: { id: this.event.id } //both EventRegister and EventDetails have :id parameter, which will be used by default when navigating
      })
      
      //replace
      //replace the current page when we want to navigate the user away from a page, while not pushing a new history entry in their browser, 
      //so the back button will no longer go back to the current page
      // this.$router.replace({ 
      //   name: 'EventDetails'
      // })

      //go
      //use go to navigate forward and back in history stack (e.g. when you’d like to have a custom back & forward button in your interface)
      // this.$router.go(1) // go forward a record      
      // this.$router.go(-1) // go backward a record
    }
  }
}
</script>
