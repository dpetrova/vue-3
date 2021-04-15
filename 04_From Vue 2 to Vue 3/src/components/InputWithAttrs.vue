<template>
  <!-- <div> -->
    <label>{{ label }}</label>
    <!-- <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    /> -->
    <input
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onInput: (event) => $emit('update:modelValue', event.target.value)
      }"      
    />
    <pre>{{ $attrs }}</pre>
  <!-- </div> -->
</template>

<script>
export default {
  //inheritAttrs: false, //let Vue 3 know that we are going to take care of binding everything ourselves (Vue will no longer attempt to auto-inject attributes into the root node)
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>