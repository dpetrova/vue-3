<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        v-model="title"
        :error="errors.title"
      />

      <BaseInput
        label="Description"
        type="text"
        v-model="description"
        :error="errors.description"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        type="text"
        v-model="location"
        :error="errors.location"
      />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup
        name="pets"
        :options="[
          { value: 1, label: 'Yes' },
          { value: 0, label: 'No' }
        ]"
        v-model="pets"
        :error="errors.pets"
      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox
          label="Catering"
          v-model="catering"
          :error="errors.catering"
        />
      </div>

      <div>
        <BaseCheckbox
          label="Live music"
          v-model="music"
          :error="errors.music"
        />
      </div>

      <div>
        <BaseButton type="submit" class="-fill-gradient" something="else">
          Submit
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import { object, string, number, boolean } from 'yup' //import validation methods from the library Yup

export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ]
    }
  },
  setup() {
    /*
    const required = value => {
      const requiredMessage = 'This field is required'
      if (value === undefined || value === null) return requiredMessage
      if (!String(value).length) return requiredMessage
      return true
    }

    const minLength = (number, value) => {
      if (String(value).length < number) {
        return 'Please type at least ' + number + ' characters'
      }
      return true
    }

    //empty validation method for fields we don't want to validate
    const anything = () => {
      return true
    }

    const validationSchema = {
      category: required,
      title: value => {
        const req = required(value)
        if (req !== true) return req

        const min = minLength(3, value)
        if (min !== true) return min

        return true
      },
      description: required,
      location: undefined, //don't want to validate
      pets: anything, //don't want to validate
      catering: anything, //don't want to validate
      music: anything //don't want to validate
    }

    const { handleSubmit } = useForm({
      validationSchema
    })

    const { value: category, errorMessage: categoryError } = useField('category')
    const { value: title, errorMessage: titleError } = useField('title')
    const { value: description, errorMessage: descriptionError } = useField('description')
    const { value: location, errorMessage: locationError } = useField('location')
    const { value: pets, errorMessage: petsError } = useField('pets', undefined, { initialValue: 1 }) //useFields() has three params: 1 -> string with the name of the model; 2 -> validation method (here is undefined because we already set our validation methods on the validationSchema); 3 -> configuration object (here we set the initialValue for our field)
    const { value: catering, errorMessage: cateringError } = useField('catering', undefined, { initialValue: false })
    const { value: music, errorMessage: musicError } = useField('music', undefined, { initialValue: false })

    */

    //declare validation schema with pre-made validation methods with YUP
    //Yup has the ability to create both array- and object-based schemas
    const validationSchema = object({
      category: string().required(), //use default error message
      title: string()
        .required('A cool title is required') //set custom error message
        .min(3),
      description: string().required(),
      location: string(), //check only for the correct data type
      pets: number(), //check only for the correct data type
      catering: boolean(), //check only for the correct data type
      music: boolean() //check only for the correct data type
    })

    //extract handleSubmit() method and errors object out of the useForm composition function
    //handleSubmit() handles checking that the form is valid before submitting
    //errors object contains all of our error messages whenever they are present (e.g: {category: "Error message about category", title: "Error message about title",...})
    const { handleSubmit, errors } = useForm({
      //schema
      validationSchema,
      //set up initial form values
      initialValues: {
        pets: 1,
        catering: false,
        music: false
      }
    })

    const { value: category } = useField('category')
    const { value: title } = useField('title')
    const { value: description } = useField('description')
    const { value: location } = useField('location')
    const { value: pets } = useField('pets')
    const { value: catering } = useField('catering')
    const { value: music } = useField('music')

    //use handleSubmit() method to setup submit logic
    //handleSubmit() has one parameter, a callback function that will be executed if the user tries to submit a valid form; it will not be executed if any errors are present in the form
    const submit = handleSubmit(values => {
      //values is an Object that contain all the property/value pairs of the form's data, matching the exact structure that is declared in validationsSchema
      console.log('submit', values)
    })

    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors
    }
  }
}
</script>
