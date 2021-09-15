import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'  //import the NProgress library
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    //passing params as props:
    //props: true
    //props object mode:
    //props: { page: 1 }
    //props function mode:
    //we're sending in an anonymous function which receives the route as an argument, then pulls out the query parameter called page and maps that parsing value to the page prop
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true, //specifying props:true to send the id part of the URL as a prop into the components
    component: EventLayout,
    //move the API call from created() hook in component into Per-Route beforeRouteEnter Guard, so we ensure the API call is successful before we load the component
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              //if event doesn't exist -> redirect to 404 NotFound
              name: '404Resource',
              params: { resource: 'event' }
            }
          } else {
            //assume network error -> redirect to NetworkError
            return { name: 'NetworkError' }
          }
        })
    },
    //nested routes: children are inheriting the path /event/:id from the parent route
    children: [
      {
        path: '', // events/:id
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register', // events/:id/register
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit', // events/:id/edit
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  //Changing Routes problem: what if we needed to change our application from using /events/:id to /event/:id. There are 2 solutions:
  // 1. update route path and use redirect:
  // {
  //   path: '/event/:id',
  //   // redirect: to => {
  //   //   return { name: 'EventDetails', params: { id: to.params.id } }
  //   // },
  //   redirect: () => { //the id in the URL will get passed along automatically when we redirect
  //     return { name: 'EventDetails' }
  //   },
  //   //redirect nested children routes:  
  //   children: [
  //     { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
  //     { path: 'edit', redirect: () => ({ name: 'EventEdit' }) }
  //   ]
  // },
  // 2. redirect with wildcard:  
  {
    //this is taking whatever comes after the matching word /event/ and placing it after /events/. This is less code, and covers all children routes:
    path: '/event/:afterEvent(.*)', //using (.*) will include / in the match (by default it doesn't)
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }    
  },  
  {
    path: '/about',
    name: 'About',
    component: About,
    alias: '/about-us' //another path to the same content
  },
  //Changing Routes problem: what if we needed to change our application from using /about for our about page to /about-us. There are 3 solutions:
  // 1. change our original route (and if we're using named routes then we don't need to change our router-links at all):
  // {
  //   path: '/about-us',
  //   name: 'about',
  //   component: About
  // },
  // 2. since there might be links around the internet to our /about page, we want to make that redirect from /about to /about-us:
  // { 
  //   path: '/about', 
  //   redirect: { name: "about" }
  // },
  // 3. use alias (meaning just provide a duplicate path to the same content):
  // {
  //   path: '/about-us',
  //   name: 'about',
  //   component: About,
  //   alias: '/about'
  // },
  // When a user tries to navigate to a page that doesn't exist:
  {
    path: '/:catchAll(.*)', //match all routes that don't match an existing route
    name: 'NotFound',
    component: NotFound
  },
  // When a user tried to navigate to a resource (event) that doesn't exist:
  {
    //in beforeEnter of EventLayout redirect the user here if the API request when fetching an event returns an error
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  //When a user's network connectivity fails:
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//call NProgress in Global Route Guards:

router.beforeEach(() => {
  //start progress bar when routing to the component
  NProgress.start()
})

router.afterEach(() => {
  //finish progress bar
  NProgress.done()
})

export default router
