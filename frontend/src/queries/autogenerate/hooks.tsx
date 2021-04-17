import * as Types from "./schemas"

import gql from "graphql-tag"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetRandomBookQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetRandomBookQuery = { __typename?: "Query" } & {
  randomBook?: Types.Maybe<
    { __typename?: "BookPassage" } & Pick<
      Types.BookPassage,
      "id" | "title" | "text" | "startIdx"
    >
  >
}

export type PoemDetailsFragment = { __typename?: "PoemType" } & Pick<
  Types.PoemType,
  "id" | "backgroundId" | "colorRange" | "createdAt" | "updatedAt"
> & {
    author?: Types.Maybe<
      { __typename?: "UserType" } & Pick<Types.UserType, "id" | "username">
    >
    book: { __typename?: "BookType" } & Pick<Types.BookType, "id" | "title">
    textChunks?: Types.Maybe<
      Array<
        Types.Maybe<
          { __typename?: "TextChunkType" } & Pick<
            Types.TextChunkType,
            "text" | "isSelected"
          >
        >
      >
    >
  }

export type GetSinglePoemQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]
}>

export type GetSinglePoemQuery = { __typename?: "Query" } & {
  poem?: Types.Maybe<{ __typename?: "PoemType" } & PoemDetailsFragment>
}

export type GetPoemsQueryVariables = Types.Exact<{
  offset?: Types.Maybe<Types.Scalars["Int"]>
  limit?: Types.Maybe<Types.Scalars["Int"]>
}>

export type GetPoemsQuery = { __typename?: "Query" } & {
  poemPages?: Types.Maybe<
    { __typename?: "PomePaginationType" } & {
      edges?: Types.Maybe<
        Array<Types.Maybe<{ __typename?: "PoemType" } & PoemDetailsFragment>>
      >
    }
  >
}

export type GetPoemsByAuthorQueryVariables = Types.Exact<{
  authorId?: Types.Maybe<Types.Scalars["ID"]>
  offset?: Types.Maybe<Types.Scalars["Int"]>
  limit?: Types.Maybe<Types.Scalars["Int"]>
}>

export type GetPoemsByAuthorQuery = { __typename?: "Query" } & {
  poemPages?: Types.Maybe<
    { __typename?: "PomePaginationType" } & {
      edges?: Types.Maybe<
        Array<Types.Maybe<{ __typename?: "PoemType" } & PoemDetailsFragment>>
      >
    }
  >
}

export type CreatePoemMutationVariables = Types.Exact<{
  textChunks:
    | Array<Types.Maybe<Types.InputTextChunkType>>
    | Types.Maybe<Types.InputTextChunkType>
  bookId: Types.Scalars["ID"]
  startIdx?: Types.Maybe<Types.Scalars["Int"]>
}>

export type CreatePoemMutation = { __typename?: "Mutation" } & {
  createPoem?: Types.Maybe<
    { __typename?: "CreatePoemMutation" } & {
      poem?: Types.Maybe<{ __typename?: "PoemType" } & PoemDetailsFragment>
    }
  >
}

export type UpdatePoemMutationVariables = Types.Exact<{
  textChunks:
    | Array<Types.Maybe<Types.InputTextChunkType>>
    | Types.Maybe<Types.InputTextChunkType>
  id: Types.Scalars["ID"]
  backgroundId?: Types.Maybe<Types.Scalars["Int"]>
  colorRange?: Types.Maybe<Types.Scalars["Int"]>
}>

export type UpdatePoemMutation = { __typename?: "Mutation" } & {
  updatePoem?: Types.Maybe<
    { __typename?: "UpdatePoemMutation" } & {
      poem?: Types.Maybe<{ __typename?: "PoemType" } & PoemDetailsFragment>
    }
  >
}

export type DeletePoemMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]
}>

export type DeletePoemMutation = { __typename?: "Mutation" } & {
  deletePoem?: Types.Maybe<
    { __typename?: "DeletePoemMutation" } & Pick<Types.DeletePoemMutation, "id">
  >
}

export type GetCurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = { __typename?: "Query" } & {
  current?: Types.Maybe<
    { __typename?: "UserType" } & Pick<Types.UserType, "id" | "username">
  >
}

export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]
}>

export type GetUserQuery = { __typename?: "Query" } & {
  user?: Types.Maybe<
    { __typename?: "UserType" } & Pick<
      Types.UserType,
      "id" | "username" | "poemsWrittenCount" | "dateJoined"
    >
  >
}

export type CreateUserMutationVariables = Types.Exact<{
  username: Types.Scalars["String"]
  password: Types.Scalars["String"]
}>

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser?: Types.Maybe<
    { __typename?: "CreateUserMutation" } & {
      user?: Types.Maybe<
        { __typename?: "UserType" } & Pick<Types.UserType, "id">
      >
    }
  >
}

export type LoginUserMutationVariables = Types.Exact<{
  username: Types.Scalars["String"]
  password: Types.Scalars["String"]
}>

export type LoginUserMutation = { __typename?: "Mutation" } & {
  tokenAuth?: Types.Maybe<
    { __typename?: "ObtainJSONWebToken" } & Pick<
      Types.ObtainJsonWebToken,
      "token"
    >
  >
}

export const PoemDetailsFragmentDoc = gql`
  fragment PoemDetails on PoemType {
    id
    backgroundId
    colorRange
    createdAt
    updatedAt
    author {
      id
      username
    }
    book {
      id
      title
    }
    textChunks {
      text
      isSelected
    }
  }
`
export const GetRandomBookDocument = gql`
  query getRandomBook {
    randomBook {
      id
      title
      text
      startIdx
    }
  }
`

export function useGetRandomBookQuery(
  options: Omit<Urql.UseQueryArgs<GetRandomBookQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetRandomBookQuery>({
    query: GetRandomBookDocument,
    ...options,
  })
}
export const GetSinglePoemDocument = gql`
  query getSinglePoem($id: ID!) {
    poem(id: $id) {
      ...PoemDetails
    }
  }
  ${PoemDetailsFragmentDoc}
`

export function useGetSinglePoemQuery(
  options: Omit<Urql.UseQueryArgs<GetSinglePoemQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetSinglePoemQuery>({
    query: GetSinglePoemDocument,
    ...options,
  })
}
export const GetPoemsDocument = gql`
  query getPoems($offset: Int, $limit: Int) {
    poemPages(offset: $offset, limit: $limit) {
      edges {
        ...PoemDetails
      }
    }
  }
  ${PoemDetailsFragmentDoc}
`

export function useGetPoemsQuery(
  options: Omit<Urql.UseQueryArgs<GetPoemsQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetPoemsQuery>({ query: GetPoemsDocument, ...options })
}
export const GetPoemsByAuthorDocument = gql`
  query getPoemsByAuthor($authorId: ID, $offset: Int, $limit: Int) {
    poemPages(authorId: $authorId, offset: $offset, limit: $limit) {
      edges {
        ...PoemDetails
      }
    }
  }
  ${PoemDetailsFragmentDoc}
`

export function useGetPoemsByAuthorQuery(
  options: Omit<
    Urql.UseQueryArgs<GetPoemsByAuthorQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<GetPoemsByAuthorQuery>({
    query: GetPoemsByAuthorDocument,
    ...options,
  })
}
export const CreatePoemDocument = gql`
  mutation createPoem(
    $textChunks: [InputTextChunkType]!
    $bookId: ID!
    $startIdx: Int
  ) {
    createPoem(textChunks: $textChunks, bookId: $bookId, startIdx: $startIdx) {
      poem {
        ...PoemDetails
      }
    }
  }
  ${PoemDetailsFragmentDoc}
`

export function useCreatePoemMutation() {
  return Urql.useMutation<CreatePoemMutation, CreatePoemMutationVariables>(
    CreatePoemDocument,
  )
}
export const UpdatePoemDocument = gql`
  mutation updatePoem(
    $textChunks: [InputTextChunkType]!
    $id: ID!
    $backgroundId: Int
    $colorRange: Int
  ) {
    updatePoem(
      textChunks: $textChunks
      id: $id
      backgroundId: $backgroundId
      colorRange: $colorRange
    ) {
      poem {
        ...PoemDetails
      }
    }
  }
  ${PoemDetailsFragmentDoc}
`

export function useUpdatePoemMutation() {
  return Urql.useMutation<UpdatePoemMutation, UpdatePoemMutationVariables>(
    UpdatePoemDocument,
  )
}
export const DeletePoemDocument = gql`
  mutation deletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
    }
  }
`

export function useDeletePoemMutation() {
  return Urql.useMutation<DeletePoemMutation, DeletePoemMutationVariables>(
    DeletePoemDocument,
  )
}
export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    current {
      id
      username
    }
  }
`

export function useGetCurrentUserQuery(
  options: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetCurrentUserQuery>({
    query: GetCurrentUserDocument,
    ...options,
  })
}
export const GetUserDocument = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      poemsWrittenCount
      dateJoined
    }
  }
`

export function useGetUserQuery(
  options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options })
}
export const CreateUserDocument = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
      }
    }
  }
`

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
  )
}
export const LoginUserDocument = gql`
  mutation loginUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
  )
}
