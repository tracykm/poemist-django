import * as Types from "./schemas"

export type GetBookQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetBookQuery = { __typename?: "Query" } & {
  poems?: Types.Maybe<
    Array<
      Types.Maybe<
        { __typename?: "PoemType" } & Pick<
          Types.PoemType,
          "id" | "createdAt" | "colorRange" | "backgroundId"
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
              { __typename?: "UserType" } & Pick<Types.UserType, "id" | "email">
            >
          }
      >
    >
  >
}

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
          }
      >
    >
  >
}
