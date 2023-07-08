<script setup>
import { ref, computed } from "vue";
// a composable exposed by the VueApollo library
import { useQuery, useMutation } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import BOOK_SUBSCRIPTION from "./graphql/newBook.subscription.gql";
import FAVORITE_BOOKS_QUERY from "./graphql/favoriteBooks.query.gql";
import ADD_BOOK_TO_FAVORITES_MUTATION from "./graphql/addBookToFavorites.mutation.gql";

import EditRating from "./components/EditRating.vue";
import AddBook from "./components/AddBook.vue";

// if use query wrapped in the composable
// import { useBooksQuery } from "./composables/useBooksQuery";

const searchTerm = ref("");
const activeBook = ref(null);
const showNewBookForm = ref(false);

// perform a GraphQL query, handles loading and error state, and returns them back to the component
// the result is a reactive property (ref)
const { result, loading, error, subscribeToMore } = useQuery(
  // query string
  ALL_BOOKS_QUERY,
  // query variables
  () => ({
    search: searchTerm.value,
  }),
  // query options
  () => ({
    debounce: 500, // debouncing
    // enabled: !searchTerm.value || searchTerm.value.length > 2, // condition to enable the query when the user has typed more than two characters
    fetchPolicy: "cache-first", // customize how the query will use the Apollo Client cache (only fetch from network if cached result is not available)
  })
);

console.log(result);

// listen to subscriptions and update with new result
subscribeToMore(() => ({
  document: BOOK_SUBSCRIPTION,
  updateQuery(previousResult, newResult) {
    const res = {
      allBooks: [
        ...previousResult.allBooks,
        newResult.subscriptionData.data.bookSub,
      ],
    };
    return res;
  },
}));

// if use query wrapped in the composable:
// const { result, loading, error } = useBooksQuery(
//   computed(() => searchTerm.value)
// );

const books = computed(() => result?.value?.allBooks ?? []);

// get favorite books from cache
const { result: favBooksResult } = useQuery(FAVORITE_BOOKS_QUERY);
console.log(favBooksResult.value);

// add book to favorites
const { mutate: addBookToFavorites } = useMutation(
  ADD_BOOK_TO_FAVORITES_MUTATION
);
</script>

<template>
  <div>
    <!-- add new book -->
    <div>
      <button v-if="!showNewBookForm" @click="showNewBookForm = true">
        Add a new book
      </button>
      <AddBook
        v-if="showNewBookForm"
        :search="searchTerm"
        @closeForm="showNewBookForm = false"
      />
    </div>
    <!-- search bar -->
    <input v-if="!activeBook" type="text" v-model="searchTerm" />
    <!-- loading -->
    <p v-if="loading">Loading...</p>
    <!-- errors -->
    <p v-else-if="error">Something went wrong! Please try again</p>
    <!-- books -->
    <template v-else>
      <!-- edit book rating -->
      <p v-if="activeBook">
        Update "{{ activeBook.title }}" rating:
        <EditRating
          :initial-rating="activeBook.rating"
          :book-id="activeBook.id"
          @closeForm="activeBook = null"
        />
      </p>
      <!-- books list -->
      <template v-else>
        <section class="list-wrapper">
          <div class="list">
            <h3>All Books</h3>
            <p v-for="book in books" :key="book.id">
              {{ book.title }} - {{ book.rating }}
              <!-- edit rating -->
              <button @click="activeBook = book">Edit rating</button>
              <!-- add a book to favorites -->
              <button @click="addBookToFavorites({ book })">
                Add to Favorites
              </button>
            </p>
          </div>
          <div class="list">
            <h3>Favorite Books</h3>
            <p v-for="book in favBooksResult.favoriteBooks" :key="book.id">
              {{ book.title }}
            </p>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.list-wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}
.list {
  width: 50%;
}
</style>
