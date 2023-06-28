import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: 'dpetrova'
  }),
  getters: {
    // when using arrow function definition, you must pass state as argument ("this" context is reset in every arrow function)
    firstName: state => state.user.split(' ')[0]
  }
})
