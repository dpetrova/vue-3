import { createStore } from 'vuex'
import EventService from '@/services/EventService'

export default createStore({
  state: {
    user: 'dpetrova',
    events: [],
    event: null
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          commit('SET_EVENT', event)
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvent({ commit, state }, id) {
      const event = state.events.find(event => event.id === id) //performance optimization: skip an unneccesary API call if we already have the event we need in events list
      if (event) {
        commit('SET_EVENT', event)
      } else {
        return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            throw error
          })
      }
    }
  },
  getters: {
    foodEvents: state => {
      return state.events.filter(event => event.category === 'food')
    }
  }
})
