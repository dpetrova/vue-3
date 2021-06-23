<template> 
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <h1>Vue 2 component:</h1>
  <CapacityVue2 name="Vue2 component"/>
  <hr>  
  <h1>Vue 3 Reactive Reference component:</h1>
  <ComponentVue3ReactiveReference name="Vue3 component"/>
  <hr>  
  <h1>Vue 3 Reactive Syntax component:</h1>
  <ComponentVue3ReactiveSyntax name="Vue3 component"/>
  <hr>  
  <h1>Vue 3 Modularizing component:</h1>
  <ComponentVue3Modularizing name="Vue3 component"/>
  <hr> 
   <!-- example of teleport component -->
  <teleport to="#end-of-body" :disabled="!state.showTeleport" v-if="state.showTeleport">
    This should be at the end.
  </teleport>
  <button @click="state.showTeleport = !state.showTeleport">
     Toggle ShowTeleport
  </button>
  <!-- example of suspense component -->
  <h1>Using Suspense component:</h1>
  <SuspenseExample/>  
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import CapacityVue2 from './components/ComponentVue2.vue'
import ComponentVue3ReactiveReference from './components/ComponentVue3ReactiveReference.vue'
import ComponentVue3ReactiveSyntax from './components/ComponentVue3ReactiveSyntax.vue'
import ComponentVue3Modularizing from './components/ComponentVue3Modularizing.vue'
import SuspenseExample from './components/SuspenseExample.vue'
import { reactive } from 'vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

const state = reactive({ showTeleport: true })

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>