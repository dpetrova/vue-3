import { reactive, watchEffect } from 'vue'

//create reactive version of the state (track for changes)
const state = reactive({
    count: 0
})

//some kind of onChange fn; the inner function is rerun automatically when reactive property is changed
watchEffect(() => {
    console.log(state.count) //0
})

//when mutate a property the inner fn of watch effect is executed
state.count++ //1