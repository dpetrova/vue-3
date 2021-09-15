<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!-- pagination -->
    <div class="pagination">
      <!-- using router-link directive, in which using query to specify the previous and the next page by subtracting and removing 1 -->
      <!-- rel attribute which are good SEO standards, defines the relationship between component URLs; this markup provides a strong hint to Google that you would like us to treat these pages as a logical sequence -->
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
//import { watchEffect } from 'vue'
import NProgress from 'nprogress'  //import the NProgress library

export default {
  name: 'EventList',
  props: ['page'], //the current page: this prop will be received from the route query, 
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  //problem:
  //we cannot call EventService.getEvents() in created hook, because created() is only called on initial load, and it is not getting called again when we go to the next page, because it's not reloading the component
  //it is a coomon problem where you want to reload a component with a change only of query parameters: the router sees that we're loading the same EventList named route, so it doesn’t need to reload the component
  //solution (two ways):
  //1.Tell the router to reload components in router-view when the full URL changes, including the query parameters, by using $route.fullPath as it's key:
  // <router-view :key="$route.fullPath" />
  //2.Watch the reactive properties for changes (which includes query parameters), by wrapping the API call inside a watchEffect() method:
  // created() {
  //   watchEffect(() => {
  //     this.events = null
  //     NProgress.start() //start the progress bar
  //     EventService.getEvents(2, this.page)
  //       .then(response => {
  //         this.events = response.data          
  //         this.totalEvents = response.headers['x-total-count'] //JSON Server sending us the total events via a "x-total-count" header
  //       })
  //       .catch(error => {
  //         console.log(error)
  //         this.$router.push({name: 'NetworkError'})
  //       })
  //       .finally(() => {
  //         NProgress.done() //whether or not the API call succeed or fail, finish the progress bar
  //       })
  //   })
  // },
  //3.Use In-Component Route Navigation Guards:
  beforeRouteEnter(routeTo, routeFrom, next) {   
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        //sending in a function to next will cause that function to be run inside the component once it’s loaded, essentially setting our reactive properties
        next(component => {
          component.events = response.data
          component.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {    
    NProgress.start() //start the progress bar
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {        
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
        next() //call next to continue navigation
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        NProgress.done() //whether or not the API call succeed or fail, finish the progress bar
      })
  },
  computed: {
    hasNextPage() {      
      var totalPages = Math.ceil(this.totalEvents / 2) //calculate totalPages as totalItems/itemsPerPage
      return this.page < totalPages //check to see if the current page is less than the total pages
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
