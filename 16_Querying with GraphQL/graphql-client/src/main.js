import { createApp, h, provide } from "vue";

// Apollo client for GraphQL that will help us send requests to the GraphQL server, track loading state, and cache the results
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";

import { getMainDefinition } from "@apollo/client/utilities";

// a template literal that will help us to ‘parse’ our GraphQL query strings
// import gql from "graphql-tag";

// a VueApollo helper required for providing the Apollo client instance to the Vue application
import { DefaultApolloClient } from "@vue/apollo-composable";

// GraphQL over WebSocket to setup Apollo Client for real-time subscriptions
import { WebSocketLink } from "@apollo/client/link/ws";

// a created local-side schema
import typeDefs from "./graphql/typedefs.gql";

import "./style.css";
import App from "./App.vue";

import FAVORITE_BOOKS_QUERY from "./graphql/favoriteBooks.query.gql";

// create a link to our GraphQL API (in our case, the server is running on http://localhost:4000/graphql)
const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

// create an Apollo link for the websocket connection
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

// we need to split our links to tell the client that wsLink should be use in case for subscriptions, and httpLinkfor the rest of the operations
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// create a cache where all the queried data will be stored
// when we send the query subsequently, we are not making a network request, instead we retrieve the data from the Apollo cache
const cache = new InMemoryCache();

// add the initial data to the cache
cache.writeQuery({
  query: FAVORITE_BOOKS_QUERY,
  data: {
    // favoriteBooks: [],
    favoriteBooks: [
      {
        __typename: "Book",
        title: "My Book",
        id: 123,
        rating: 5,
      },
    ],
  },
});

// resolvers
const resolvers = {
  Mutation: {
    addBookToFavorites: (_parent, variables, context) => {
      // retrieve favorites books array from cache
      const data = context.cache.readQuery({ query: FAVORITE_BOOKS_QUERY });
      // create a new object where favoriteBooks contains the previous list and a new book
      const newData = {
        favoriteBooks: [...data.favoriteBooks, variables.book],
      };
      // write this new data back to the cache
      context.cache.writeQuery({ query: FAVORITE_BOOKS_QUERY, data: newData });
      // return the array of books
      return newData.favoriteBooks;
    },
  },
};

// create an ApolloClient instance
// this instance will serve to manage both local and remote data in our app (fetch data from the GraphQL API, change the data on the server, and update the local cache)
const apolloClient = new ApolloClient({
  //link: httpLink,
  link: link,
  cache,
  typeDefs, // pass additional local-side schema to Apollo Client
  resolvers, // pass resolvers to Apollo Client constructor
});

// const ALL_BOOKS_QUERY = gql`
//   query AllBooks {
//     allBooks {
//       id
//       title
//       rating
//     }
//   }
// `;

// with apolloClient.query you can perform a network request to GraphQL server from outside Vue components
// you might need this for example if you decide to keep the local store in Vuex
// apolloClient
//   .query({
//     query: ALL_BOOKS_QUERY,
//   })
//   .then((res) => {
//     console.log(res);
//   });

// to call a query from the Vue component we need to modify our createApp call to inject the client in our application
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

// register a global custom directive called `v-focus` that will automatically focus on an input
app.directive("focus", {
  // when the bound element is mounted into the DOM...
  mounted(el) {
    // focus the element
    el.focus();
  },
});

app.mount("#app");
