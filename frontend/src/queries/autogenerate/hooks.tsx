import * as Types from "./operations"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"

export const GetBookDocument = gql`
  query GetBook {
    poems {
      id
      createdAt
      colorRange
      backgroundId
      textChunks {
        text
        isSelected
      }
      author {
        id
        email
      }
    }
  }
`

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
  >,
) {
  return Apollo.useQuery<Types.GetBookQuery, Types.GetBookQueryVariables>(
    GetBookDocument,
    baseOptions,
  )
}
export function useGetBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetBookQuery,
    Types.GetBookQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetBookQuery, Types.GetBookQueryVariables>(
    GetBookDocument,
    baseOptions,
  )
}
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>
export type GetBookQueryResult = Apollo.QueryResult<
  Types.GetBookQuery,
  Types.GetBookQueryVariables
>
export const GetSinglePoemDocument = gql`
  query getSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      createdAt
      updatedAt
    }
    current {
      id
    }
  }
`

/**
 * __useGetSinglePoemQuery__
 *
 * To run a query within a React component, call `useGetSinglePoemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSinglePoemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSinglePoemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSinglePoemQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetSinglePoemQuery,
    Types.GetSinglePoemQueryVariables
  >,
) {
  return Apollo.useQuery<
    Types.GetSinglePoemQuery,
    Types.GetSinglePoemQueryVariables
  >(GetSinglePoemDocument, baseOptions)
}
export function useGetSinglePoemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetSinglePoemQuery,
    Types.GetSinglePoemQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    Types.GetSinglePoemQuery,
    Types.GetSinglePoemQueryVariables
  >(GetSinglePoemDocument, baseOptions)
}
export type GetSinglePoemQueryHookResult = ReturnType<
  typeof useGetSinglePoemQuery
>
export type GetSinglePoemLazyQueryHookResult = ReturnType<
  typeof useGetSinglePoemLazyQuery
>
export type GetSinglePoemQueryResult = Apollo.QueryResult<
  Types.GetSinglePoemQuery,
  Types.GetSinglePoemQueryVariables
>
export const GetPoemsDocument = gql`
  query getPoems {
    poems {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetPoemsQuery__
 *
 * To run a query within a React component, call `useGetPoemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPoemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetPoemsQuery,
    Types.GetPoemsQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetPoemsQuery, Types.GetPoemsQueryVariables>(
    GetPoemsDocument,
    baseOptions,
  )
}
export function useGetPoemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPoemsQuery,
    Types.GetPoemsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetPoemsQuery, Types.GetPoemsQueryVariables>(
    GetPoemsDocument,
    baseOptions,
  )
}
export type GetPoemsQueryHookResult = ReturnType<typeof useGetPoemsQuery>
export type GetPoemsLazyQueryHookResult = ReturnType<
  typeof useGetPoemsLazyQuery
>
export type GetPoemsQueryResult = Apollo.QueryResult<
  Types.GetPoemsQuery,
  Types.GetPoemsQueryVariables
>
