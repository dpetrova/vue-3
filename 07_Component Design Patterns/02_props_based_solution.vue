The Problem with Props-Based Solutions:
The strategy for solving each new requirement is simply to layer on a new prop 
that controls the desired behavior and layer it into the existing template and data model. 
Is it wrong? Absolutely not. It solves the requirements and works as expected for the user.

However, the code becomes rather difficult to read and could become very difficult to maintain.
As a result, some of the common issues with props-based solutions are:
1.	New developers who have no prior experience with the component are forced to navigate 
    a complex maze of conditionals to add any new feature or debug the code.
2.	Components lose their ability to be intuitive since components with numerous props 
    essentially gain their own unique configurations that often require extensive onboarding 
    or explanation just to understand how everything works.
3.	Complex components that become hard to maintain often lead to developers creating alternate components
    since deadlines take precedent over good coding practices, which fragments the application’s ecosystem.

<template>
  <button type="button" class=“nice-button“>
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <template v-if="iconLeftName">
        <LoadingSpinner v-if="isLoadingLeft" />
        <AppIcon v-else :icon="iconLeftName" />
      </template>
      {{ text }}
      <template v-if="iconRightName">
        <LoadingSpinner v-if="isLoadingRight" />
        <AppIcon v-else :icon="iconRightName" />
      </template>
    </template>
  </button>
</template>

<script>
export default {  
  props: [
    'text',
    'iconLeftName',
    'iconRightName',
    'isLoading',
    'isLoadingLeft',
    'isLoadingRight'
  ]
}
</script>

So the question becomes: "Is there a better way?" And the answer is absolutely yes.

A Simpler and Cleaner Solution
Instead of relying solely on props, it’s time to reach for our next component design technique: slots.

<template>
  <button class="button">
    <slot />
  </button>
</template>
