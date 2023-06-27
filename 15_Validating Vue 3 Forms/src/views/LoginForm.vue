<template>
  <h1>Login Form</h1>
  <form @submit.prevent="onSubmit">
    <!-- use aggressive validation (listen for the input event, which fires every time the user adds or deletes a character) -->
    <BaseInput
      label="Name (aggressive validation)"
      type="text"
      :error="nameError"
      v-model="name"
    />

    <!-- use lazy validation (listen for the change event, which fires once the field loses focus) -->
    <BaseInput
      label="Email (lazy validation)"
      type="email"
      :error="emailError"
      :modelValue="email"
      @change="handleChange"
    />

    <BaseInput
      label="Password"
      type="password"
      v-model="password"
      :error="passwordError"
    />

    <BaseButton type="submit" class="-fill-gradient">
      Submit
    </BaseButton>
  </form>
</template>

<script>
/*
useField() function tells vee-validate that we are creating a form field that we want to have validated.
In its simplest form, it accepts two parameters:
    1. A String with the name of the model for this field
    2. A function to check if the value of the field is valid or not
Validation functions in vee-validate can return either true to indicate that the field is valid, or a string that will represent the error message
    const email = useField('email', function(value) {
      if (!value) return 'This field is required'
      return true
    })
Notice that we saving the result from the useField() method in an email constant. This constant is an object that contains two very important properties:
    1.value -> is a Vue ref or reactive value. We will use this value to keep the data-binding between our input component and the state (v-model)
    2.errorMessage -> use it to show error message

useForm() function is a way to declare how we want our forms to be validated all at once.
When validating at form level, we create an object that will represent the structure of our form’s model, or data — this is usually referred to as the Schema
useForm() method takes an object as its only parameter.
Within this object we can define several configuration properties, but the one we are interested in is validationSchema and set this property to our validations Schema object
  useForm({
    validationSchema: validations
  })
*/
import { useField, useForm } from 'vee-validate'

export default {
  setup() {
    function onSubmit() {
      alert('Submitted')
    }

    // const email = useField('email', function(value) {
    //   if (!value) return 'This field is required'

    //   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   if (!regex.test(String(value).toLowerCase())) {
    //     return 'Please enter a valid email address'
    //   }

    //   return true
    // })

    const validations = {
      name: value => {
        if (!value) return 'This field is required'
        if (String(value).length < 3) {
          return 'Please type at least 3 characters'
        }
        return true
      },
      email: value => {
        if (!value) return 'This field is required'

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(String(value).toLowerCase())) {
          return 'Please enter a valid email address'
        }

        return true
      },
      password: value => {
        const requiredMessage = 'This field is required'
        if (value === undefined || value === null) return requiredMessage
        if (!String(value).length) return requiredMessage

        return true
      }
    }

    useForm({
      validationSchema: validations
    })

    const { value: name, errorMessage: nameError } = useField('name')
    //extract also handleChange function that inform vee-validate that a change in state for the given field has occurred
    const { value: email, errorMessage: emailError, handleChange } = useField(
      'email'
    )
    const { value: password, errorMessage: passwordError } = useField(
      'password'
    )

    //in cases where form consists of several inputs, we can use setFieldValue function that can be extracted from the useForm composition function and will trigger the validation rules
    // const { setFieldValue } = useForm({
    //   validationSchema: validations
    // })
    // const handleChange = event => {
    //   setFieldValue('email', event.target.value)
    // }

    return {
      onSubmit,
      //email: email.value,
      email,
      emailError,
      password,
      passwordError,
      name,
      nameError,
      handleChange
    }
  }
}
</script>
