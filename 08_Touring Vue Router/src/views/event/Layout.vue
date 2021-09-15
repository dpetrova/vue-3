<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <!-- since these links all require :id, when the router-link is rendered in the template (if params: { id } not sent in) it will look at the URL parameters, 
      and if :id exists in the current route, it will use the :id in all of the link URLs -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <!-- here will be rendered all the event profile components; as passing down the event object from our API so we don't have to fetch it again in every component-->
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ['GStore']
}
</script>
