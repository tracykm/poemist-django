import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export const GetBookDocument = gql`
  query GetBook {
    poems {
      id
      author {
        email
        id
      }
    }
  }
`;

/**
 * __useGetBookQuery__
 *
 * To run a query within a React component, call `useGetBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetBookQuery,
    Types.GetBookQueryVariables
  >
) {
  return Apollo.useQuery<Types.GetBookQuery, Types.GetBookQueryVariables>(
    GetBookDocument,
    baseOptions
  );
}
export function useGetBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetBookQuery,
    Types.GetBookQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.GetBookQuery, Types.GetBookQueryVariables>(
    GetBookDocument,
    baseOptions
  );
}
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>;
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>;
export type GetBookQueryResult = Apollo.QueryResult<
  Types.GetBookQuery,
  Types.GetBookQueryVariables
>;
