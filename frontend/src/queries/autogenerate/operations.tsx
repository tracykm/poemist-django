import * as Types from "./schemas"

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
  current?: Types.Maybe<
    { __typename?: "UserType" } & Pick<Types.UserType, "id">
  >
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
  current?: Types.Maybe<
    { __typename?: "UserType" } & Pick<Types.UserType, "id">
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
