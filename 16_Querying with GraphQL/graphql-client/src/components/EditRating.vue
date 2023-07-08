<template>
  <input
    type="text"
    v-model="rating"
    v-focus
    :disabled="loading"
    @keyup.enter="updateRating"
    @keyup.esc="emit('closeForm')"
  />
  <p v-if="loading">Updating...</p>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import UPDATE_BOOK_MUTATION from "../graphql/updateBook.mutation.gql";

// props
const props = defineProps({
  initialRating: {
    type: Number,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

// emits
const emit = defineEmits(["closeForm"]);

// data
const rating = ref(props.initialRating); // create a local copy of the prop to edit the rating

// a composable that takes a mutation and options as parameters, and returns methods and properties specific to the GraphQL mutation state
// it’s a good practice to use a function-returning object for the second parameter of useMutation; this way, you ensure that any changes to a component’s reactive data will be applied to the mutation’s variables
// why the rating was updated in the UI:
// Apollo Client considers id as an entity key, and it’s smart enough to recognize when we update a book and to merge all the new data to the book with the same id if it’s already in the cache
// all queries that were fetching an updated entity are ‘subscriptions’ to your Apollo cache
const {
  mutate: updateRating,
  loading,
  onDone,
  error,
} = useMutation(UPDATE_BOOK_MUTATION, () => ({
  variables: {
    id: props.bookId,
    rating: parseFloat(rating.value), // rating.value is a string, and our schema requires rating to be Float that's why we are parsing a float here
  },
}));

// a hook that is triggered when the mutation is resolved
onDone(() => {
  emit("closeForm");
});

// methods
// const updateRating = () => {
//   mutate();
//   onDone(() => {
//     emit("closeForm");
//   });
// };
</script>
