import * as Types from "./schemas";

export type GetBookQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetBookQuery = { __typename?: "Query" } & {
  poems?: Types.Maybe<
    Array<
      Types.Maybe<
        { __typename?: "PoemType" } & Pick<Types.PoemType, "id"> & {
            author?: Types.Maybe<
              { __typename?: "UserType" } & Pick<Types.UserType, "email" | "id">
            >;
          }
      >
    >
  >;
};
