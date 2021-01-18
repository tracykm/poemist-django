import * as Types from "./schemas"

export type GetSinglePoemQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]
}>

export type GetSinglePoemQuery = { __typename?: "Query" } & {
  poem?: Types.Maybe<
    { __typename?: "PoemType" } & Pick<
      Types.PoemType,
      "id" | "backgroundId" | "colorRange" | "createdAt" | "updatedAt"
    > & {
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
        author?: Types.Maybe<
          { __typename?: "UserType" } & Pick<Types.UserType, "id" | "username">
        >
        book: { __typename?: "BookType" } & Pick<Types.BookType, "id" | "title">
      }
  >
  current?: Types.Maybe<
    { __typename?: "UserType" } & Pick<Types.UserType, "id">
  >
}

export type GetPoemsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPoemsQuery = { __typename?: "Query" } & {
  poems?: Types.Maybe<
    Array<
      Types.Maybe<
        { __typename?: "PoemType" } & Pick<
          Types.PoemType,
          "id" | "backgroundId" | "colorRange" | "createdAt" | "updatedAt"
        > & {
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
            author?: Types.Maybe<
              { __typename?: "UserType" } & Pick<
                Types.UserType,
                "id" | "username"
              >
            >
            book: { __typename?: "BookType" } & Pick<
              Types.BookType,
              "id" | "title"
            >
          }
      >
    >
  >
}

export type GetPoemsByAuthorQueryVariables = Types.Exact<{
  authorId?: Types.Maybe<Types.Scalars["ID"]>
}>

export type GetPoemsByAuthorQuery = { __typename?: "Query" } & {
  poems?: Types.Maybe<
    Array<
      Types.Maybe<
        { __typename?: "PoemType" } & Pick<
          Types.PoemType,
          "id" | "backgroundId" | "colorRange" | "createdAt" | "updatedAt"
        > & {
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
            author?: Types.Maybe<
              { __typename?: "UserType" } & Pick<
                Types.UserType,
                "id" | "username"
              >
            >
            book: { __typename?: "BookType" } & Pick<
              Types.BookType,
              "id" | "title"
            >
          }
      >
    >
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
      poem?: Types.Maybe<
        { __typename?: "PoemType" } & Pick<
          Types.PoemType,
          "id" | "backgroundId" | "colorRange"
        > & {
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
      >
    }
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
