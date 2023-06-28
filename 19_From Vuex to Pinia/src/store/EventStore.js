import { defineStore } from 'pinia'
import EventService from '@/services/EventService'

export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      events: [],
      event: {}
    }
  },
  getters: {
    // when using normal function definition you can access the store with the "this" keyword
    numberOfEvents() {
      return this.events.length
    },
    // when using arrow function definition, you must pass state as argument ("this" context is reset in every arrow function)
    foodEvents: state => state.events.filter(event => event.category === 'food')
  },
  actions: {
    fetchEvents() {
      return EventService.getEvents()
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvent(id) {
      return EventService.getEvent(id)
        .then(response => {
          this.event = response.data
        })
        .catch(error => {
          throw error
        })
    },
    createEvent(event) {
      return EventService.postEvent(event)
        .then(() => {
          this.events.push(event)
          this.event = event
        })
        .catch(error => {
          throw error
        })
    }
  }
})
