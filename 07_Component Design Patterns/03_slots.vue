App.vue with BaseButton using props:
<template>
  <main>
    <BaseButton text="Cancel" />
    <BaseButton text="Submit" right-icon="right-arrow" />
  </main>
</template>

App.vue with BaseButton using slots:
<template>
  <main>
    <!-- BaseButton with no custom content -->
    <BaseButton></BaseButton>
    <!-- BaseButton with custom content -->
    <BaseButton>Cancel</BaseButton>
    <BaseButton>Submit <span class="icon right-arrow"></span></BaseButton>
  </main>
</template>

BaseButton.vue with slot component:
<template>
  <button class="button">    
    <slot></slot>
  </button>
</template>

BaseButton.vue with with default content:
<template>
  <button class="button">    
    <slot>Submit</slot> 
  </button>
</template>

Named slots is a way to configure your slots so that they are unique from one another. 
To do this, slots have a name property that allows you to designate it with a custom identifier.

By default, all slots are actually assigned the name default:
// Using implicit naming:
<template>
  <button>
    <slot></slot>
  </button>
</template>

// Using explicit naming:
<template>
  <button>
    <slot name="default"></slot>
  </button>
</template>


CustomLayout.vue with named slots:
<template>
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

How would this look when using the CustomLayout component?
Similar to how you use the <template> block to define the HTML of your single file components, 
you can also use it to define specific blocks of HTML that need to be passed into a slot. 
In order to do this, you need to apply the v-slot directive.

App.vue with template blocks:
<template>
  <CustomLayout>
    <template v-slot:header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <!-- same as:
    <template v-slot:default>
      <p>Main body content</p>
    </template> -->
    <template v-slot:footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>

App.vue with shorthand slot syntax:
<template>
  <CustomLayout>
    <template #header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <template #footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>

What if I need to programmatically generate slot names?
In this case, we can use dynamic slot names to accomplish this.
Instead of passing the name of the slot, you you need to pass a variable by wrapped in square brackets
// Normal named slot:
<template v-slot:slotName>...</template>

// Dynamic named slot:
<template v-slot:[dynamicSlotNameVariable]>...</template>

<template>
  <CustomLayout>
    <template
      v-for="section in layout"
      v-slot:[section.name]
      :key="`blog-section-${section.name}`"
    >
      {{ section.content }}
    </template>
  </CustomLayout>
</template>
<script>
export default {
  data() {
    return {
      layout: [
        { name: 'header', content: 'My Blog Title' },
        { name: 'body', content: 'Main body content' },
        { name: 'footer', content: 'Footer contet' }
      ]
    }
  }
}
</script>






The trade-offs of slots come with the inability to provide constraints to what is possible in a component.