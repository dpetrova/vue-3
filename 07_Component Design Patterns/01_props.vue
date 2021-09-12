<template>
    <section>
        <img :src="image"/>
        <h1>{{ title }}</h1>
        <p>{{ length }} <span v-if="watched">✅</span><p>
    </section>
</template>

<script>
export default {
  name: 'Movie',
  //Array Syntax:
  //props: ['image', 'title', 'length', 'watched']

  //Object Syntax:
  props: {
      image: {
          type: String, // String/Number/Boolean/Array/Object/Date/Function/Symbols
          default: '/images/placeholder.png',
          //custom validator takes an anonymous function that receives the passed-down value as its first argument
          validator: propValue => {            
            const propExists = propValue.length > 0
            const hasImagesDirectory = propValue.indexOf('/images/') > -1
            const isPNG = propValue.endsWith('.png')
            const isJPEG = propValue.endsWith('.jpeg') || propValue.endsWith('.jpg')
            const hasValidExtension = isPNG || isJPEG
            //return a Boolean that will serve as your validation
            return propExists && hasImagesDirectory && hasValidExtension
          }          
      },
      title: {
          type: String,
          required: true          
      },
      length: {
          type: [Number, String],
          required: true          
      },
      watched: {
          type: Boolean,          
          default: false
      }
    }

}
</script>



