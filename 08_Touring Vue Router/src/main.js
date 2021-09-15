import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//create a Global Store
import GStore from './store' //import a reactive object independent of our components
import 'nprogress/nprogress.css' //import the CSS for NProgress

createApp(App)
  .use(router)
  .provide('GStore', GStore) //provide that reactive object available for components in our app  to use (inject) it
  .mount('#app')
