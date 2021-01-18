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
export const GetPoemsByAuthorDocument = gql`
  query getPoemsByAuthor($authorId: ID) {
    poems(authorId: $authorId) {
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
 * __useGetPoemsByAuthorQuery__
 *
 * To run a query within a React component, call `useGetPoemsByAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoemsByAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoemsByAuthorQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetPoemsByAuthorQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetPoemsByAuthorQuery,
    Types.GetPoemsByAuthorQueryVariables
  >,
) {
  return Apollo.useQuery<
    Types.GetPoemsByAuthorQuery,
    Types.GetPoemsByAuthorQueryVariables
  >(GetPoemsByAuthorDocument, baseOptions)
}
export function useGetPoemsByAuthorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPoemsByAuthorQuery,
    Types.GetPoemsByAuthorQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    Types.GetPoemsByAuthorQuery,
    Types.GetPoemsByAuthorQueryVariables
  >(GetPoemsByAuthorDocument, baseOptions)
}
export type GetPoemsByAuthorQueryHookResult = ReturnType<
  typeof useGetPoemsByAuthorQuery
>
export type GetPoemsByAuthorLazyQueryHookResult = ReturnType<
  typeof useGetPoemsByAuthorLazyQuery
>
export type GetPoemsByAuthorQueryResult = Apollo.QueryResult<
  Types.GetPoemsByAuthorQuery,
  Types.GetPoemsByAuthorQueryVariables
>
export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    current {
      id
      username
    }
  }
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetCurrentUserQuery,
    Types.GetCurrentUserQueryVariables
  >,
) {
  return Apollo.useQuery<
    Types.GetCurrentUserQuery,
    Types.GetCurrentUserQueryVariables
  >(GetCurrentUserDocument, baseOptions)
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetCurrentUserQuery,
    Types.GetCurrentUserQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    Types.GetCurrentUserQuery,
    Types.GetCurrentUserQueryVariables
  >(GetCurrentUserDocument, baseOptions)
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  Types.GetCurrentUserQuery,
  Types.GetCurrentUserQueryVariables
>
export const GetUserDocument = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      poemsWrittenCount
      dateJoined
    }
    current {
      id
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetUserQuery,
    Types.GetUserQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUserQuery,
    Types.GetUserQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  Types.GetUserQuery,
  Types.GetUserQueryVariables
>
