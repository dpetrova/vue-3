Scoped slots is a technique for allowing a component to expose data to the slot’s template block.

Header.vue
<template>
  <slot name="header" />
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>

Layout.vue
<template>
  <Header>
    <template v-slot:header>
      <!-- How do we get the logoImage from Header.vue? -->
    </template>
  </Header>
</template>

Let’s say that we want to expose our logoImage property to the slot. 
To do this, we define a prop (like you would with a normal component) on our slot.

Header.vue
<template>
  <slot name="header" :logo="logoImage" />
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>

By defining these “slot props,” this allows us to access them in the <template> block 
by exposing the slotProps value.

Layout.vue
<template>
  <Header>
    <!-- slotProps is object containing all props defined on the slot   -->
    <template v-slot:header="slotProps">{{ slotProps.logo }}</template>
  </Header>
</template>


There are some caveats and best practices to keep in mind when using scoped slots:
1.Any data exposed via slot props is scoped to the slot template and nothing more. 
  Exposed slotProps are not available to the parent component for use in things like methods, 
  computed properties, or something else, because the data that the child is exposing to the parent 
  is only scoped to the slot template block:  

Layout.vue  
<template>
  <Header>    
    <template v-slot:header="slotProps">{{ slotProps.logo }}</template>
  </Header>
</template>  
<script>
export default {
  computed: { 
    uppercaseLogo() {
      // 🛑THIS DOES NOT WORK
      this.slotProps.logo.toUpperCase()
    }
  }
}
</script>

While this may seem like an inconvenience, this ultimately helps developers by encouraging us 
to keep the concerns for each component in the correct place. In other words, rather than try to create 
a computed property in Layout.vue component, it would be more consistent to keep that logic inside of 
Header.vue instead and then expose it via slot props:

Header.vue
<template>
  <slot name="header" :logo="logoImage" :uppercaseLogoTitle="uppercaseLogo"/>
</template>
<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  },
  computed: {
    uppercaseLogo() {
      return this.logoImage.toUpperCase()
    }
  }
}
</script>

2.Destructuring slot props:
Because slotProps results in a JavaScript object, we can use ES6 destructuring:

Layout.vue (before)
<template>
  <Header>    
    <template v-slot:header="slotProps">{{ slotProps.logo }}</template>
  </Header>  
</template>

Layout.vue (after)
<template>
  <Header>    
    <template v-slot:header="{ logo }">{{ logo }}</template>
  </Header>  
</template>

3.When a component is being used with only a single slot, you can actually apply the v-slot directive 
  directly to the component and remove the template blocks:

  Layout.vue (before v-slot abbreviated shorthand)
<template>
  <Header>    
    <template v-slot:header="{ logo }"><h1>{{ logo }}</h1></template>
  </Header>  
</template>

Layout.vue (with v-slot abbreviated shorthand)
<template>
  <Header v-slot:header="{ logo }"><h1>{{ logo }}</h1></Header>  
</template>

However, the moment you need to use another slot, this does not work. 