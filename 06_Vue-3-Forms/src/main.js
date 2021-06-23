import { createApp } from 'vue'
import App from './App.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// use Webpack's function require.context to allow webpack to know that it needs to require all of the files in the components folder that start with the "Base" prefix, allowing both .vue and .js extensions
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

// create a Vue application by calling createApp with App.vue component reference
const app = createApp(App)

//call keys() on requireComponent to get an array of fileNames, which will contain the route to each of our "Base" components ['./BaseInput.vue', './BaseSelect.vue']
requireComponent.keys().forEach(fileName => {
  // get the component object by using the filename to extract if from the requireComponent object
  const component = requireComponent(fileName)

  // use Lodash's upperFirst and camelCase functions to ensure that file names like BaseInput.vue and base-input.vue, or baseInput.vue get turned into BaseInput.vue
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')) //regex here will strip anything before the component name and the extension, leaving us with just the name of the component (BaseInput); $1 -> yielded result from parenthesized block
  )

  // use the extracted component name and the component configuration that we got earlier to register the component as a global component
  app.component(componentName, component.default || component)
})

//wrap up the file by mounting our application into the element with an id of app
app.mount('#app')
