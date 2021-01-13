/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBook
// ====================================================

export interface GetBook_poems_author {
  __typename: "UserType";
  email: string;
}

export interface GetBook_poems {
  __typename: "PoemType";
  id: string;
  author: GetBook_poems_author | null;
}

export interface GetBook {
  poems: (GetBook_poems | null)[] | null;
}
