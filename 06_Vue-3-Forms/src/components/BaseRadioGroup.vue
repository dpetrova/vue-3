<template>
  <!-- <BaseRadio
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :modelValue="modelValue"
    :name="name"
    @update:modelValue="$emit('update:modelValue', $event)"
  /> -->
  <div>
    <!-- component is a meta component, rendering dynamic component (here div or span) depends on its "is" prop  -->
    <component
      v-for="opts in options"
      :key="opts.value"
      :is="vertical ? 'div' : 'span'"
      :style="vertical ? '' : 'margin-right: 20px;'"
    >
      <BaseRadio
        :name="name"
        :label="opts.label"
        :modelValue="modelValue"
        :value="opts.value"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
