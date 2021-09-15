<template>
  <p>Edit the event here</p>
</template>

<script>
export default {
  props: ['event'],
  data: function() {
    return {
      unsavedChanges: true  // flag gets set to true if anything is changed on the edit form (it should be false by default) here set to true for test)
    }
  },
  //use In-Component Route Navigation Guards to confirm that the user wants to leave the page before saving changes in edit form (if any)
  
  // beforeRouteLeave(routeTo, routeFrom, next) {
  //   if (this.unsavedChanges) {
  //     const answer = window.confirm(
  //       'Do you really want to leave? You have unsaved changes!'
  //     )
  //     if (answer) {
  //       next() // <-- Confirms the navigation
  //     } else {
  //       next(false) // <-- Cancels the navigation
  //     }
  //   } else {
  //     next() // <-- Confirms the navigation
  //   }
  // }
  //use v4 Router Syntax (instead of using next(), we can use return values):
  beforeRouteLeave(routeTo, routeFrom) {
    console.log(routeTo)
    console.log(routeFrom)
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes!'
      )
      if (!answer) {
        return false // <-- Cancels the navigation
      } 
    }
  }
}

// In-Component Route Navigation Guards:
//   • beforeRouteEnter(routeTo, routeFrom, next): 
//     - is called before the component is created
//     - since the component has not been created yet, we can't use the "this" keyword here
//     - however, if we want to set some reactive data inside our component, there's a way to set it using the next
//   • beforeRouteUpdate(routeTo, routeFrom, next):
//     - is called when the route changes, but is still using the same component
//     - for example when we paginate, and we switch from page to page but still using the same component
//     - it does have access to "this"
//   • beforeRouteLeave(routeTo, routeFrom, next):
//     - is called when this component is navigated away from
//     - it does have access to "this"

// About the their parameters:
//     • routeTo - the route that is about to be navigated to
//     • routeFrom - the route that is about to be navigated away from
//     • next - a function used to resolve the hook, and continue navigation

// About the next():
//     • next() - continue navigation to the component, which is referenced inside routeTo
//     • next(false) - cancel the navigation
//     • next('/') - redirect to the / path
//     • next({ name: 'event-list' }) - redirect to the named path

// Instead of next() we can use new v4 Router sintax in which return values:
//     • no return value - continue navigation to the component, which is referenced inside routeTo
//     • return true - continue navigation to the component, which is referenced inside routeTo
//     • return false - cancel the navigation
//     • return '/' - redirect to the / path
//     • return { name: 'event-list' } - redirect to the named path
</script>