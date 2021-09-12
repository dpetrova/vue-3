<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        error="This field is required"
      />

      <fieldset>
        <legend>Name & describe your event</legend>
        <BaseInput
          label="Title"
          v-model="event.title"
          type="text"
          error="This field is required"
        />

        <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
        />
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>
        <BaseInput label="Location" v-model="event.location" type="text" />
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <BaseRadioGroup
          v-model="event.pets"
          name="pets"
          :options="[
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]"
        />

        <template v-if="event.pets === 0">
          <h3>Are you sure? 🐶</h3>
          <BaseRadioGroup
            v-model="event.petsagain"
            name="petsagain"
            :options="[
              { value: 1, label: 'Yes' },
              { value: 0, label: 'No' }
            ]"
            vertical
          />
        </template>
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        <div>
          <BaseCheckbox label="Catering" v-model="event.extras.catering" />
        </div>

        <div>
          <BaseCheckbox label="Live music" v-model="event.extras.music" />
        </div>
      </fieldset>

      <div>
        <BaseButton type="submit" class="-fill-gradient" something="else">
          Submit
        </BaseButton>
      </div>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import axios from 'axios'

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
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false
        }
      }
    }
  },
  methods: {
    createEvent() {
      axios
        .post(
          'https://my-json-server.typicode.com/Code-Pop/Vue-3-Forms/events',
          this.event
        )
        .then(function(response) {
          console.log('Response', response)
        })
        .catch(function(err) {
          console.log('Error', err)
        })
    }
  }
}
</script>

<style>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
</style>
