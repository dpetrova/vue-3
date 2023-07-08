// a composable exposed by the VueApollo library
import { useQuery } from "@vue/apollo-composable";
// a template literal that will help us to "parse" our GraphQL query strings
import gql from "graphql-tag";

const ALL_BOOKS_QUERY = gql`
  query AllBooks($search: String) {
    allBooks(search: $search) {
      id
      title
      rating
    }
  }
`;

export const useBooksQuery = (searchTerm) => {
  // perform a GraphQL query, handles loading and error state, and returns them back to the component
  // the result is a reactive property (ref)
  const { result, loading, error } = useQuery(
    // query string
    ALL_BOOKS_QUERY,
    // query variables
    () => ({
      search: searchTerm.value,
    }),
    // query options
    () => ({
      debounce: 500, // debouncing
      // enabled: searchTerm.length > 2, // condition to enable the query when the user has typed more than two characters
      fetchPolicy: "cache-first", // customize how the query will use the Apollo Client cache (only fetch from network if cached result is not available)
    })
  );

  return {
    result,
    books: result?.value?.allBooks ?? [],
    loading,
    error,
  };
};
