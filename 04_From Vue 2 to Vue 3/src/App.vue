<template>
  <div>
    <h3>Base Input examples</h3>
    <!-- shorthand   -->
    <BaseInput v-model="myInput" />
    <!-- long version   -->
    <BaseInput v-model:modelValue="myInput" />
    <pre>{{ myInput }}</pre>
    <br>
    <h3>Multi v-model bindings</h3>
    <SalutationName
      v-model:salutation="form.salutation"
      v-model:name="form.name"
    />
    <br>
    <h3>v-model modifiers -> capitalize</h3>
    <SalutationName
      v-model:salutation.capitalize="form.salutation"
      v-model:name.capitalize="form.name"
    />
    <pre>{{ form }}</pre>
    <br>
    <h3>Attr example</h3>
    <InputWithAttrs 
      v-model="email"
      label="Email:"
      type="email"
      class="thicc"
      @blur="email = 'blurrr@its.cold'"
    />    
    <pre>{{ email }}</pre>
    <br>
    <h3>Emits example</h3>
    <pre>This is Schroedinger Box: {{ schroedingerState }}</pre>
    <SchroedingersBox @peekedIntoTheBox="schroedingerState = $event" />
    
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import BaseInput from './components/BaseInput'
import SalutationName from './components/SalutationName'
import InputWithAttrs from './components/InputWithAttrs'
import SchroedingersBox from './components/SchroedingersBox'

export default {
  name: 'App',
  components: {
    BaseInput,
    SalutationName,
    InputWithAttrs,
    SchroedingersBox
  },  
  setup () {
    const myInput = ref(null)
    const form = reactive({
      salutation: '',
      name: ''
    })
    const email = ref('')
    const schroedingerState = ref('')

    return {
      form, myInput, email, schroedingerState
    }
  }
}
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
