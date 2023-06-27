//Vue 3 decoupled reactivity from components. 
//This allows us to declare a reactive object independent of our components, and then inject that reactive object to the components who need it. 

import { reactive } from 'vue'

//We create a reactive object to use as a Global Storage, and share that object across our app.
//You can think of GStore as a JavaScript Object which has reactivity, meaning that when any properties get changed it will be updated on our webpage
export default reactive({ flashMessage: '', event: null })
