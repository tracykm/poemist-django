export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any
}

export type Query = {
  __typename?: "Query"
  _debug?: Maybe<DjangoDebug>
  hello?: Maybe<Scalars["String"]>
  randomBook?: Maybe<BookPassage>
  poem?: Maybe<PoemType>
  user?: Maybe<UserType>
  poems?: Maybe<Array<Maybe<PoemType>>>
  poemPages?: Maybe<PomePaginationType>
  users?: Maybe<Array<Maybe<UserType>>>
  current?: Maybe<UserType>
}

export type QueryPoemArgs = {
  id: Scalars["ID"]
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type QueryPoemsArgs = {
  authorId?: Maybe<Scalars["ID"]>
}

export type QueryPoemPagesArgs = {
  offset?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  authorId?: Maybe<Scalars["ID"]>
}

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: "DjangoDebug"
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>
}

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: "DjangoDebugSQL"
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars["String"]
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars["String"]
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars["String"]>
  /** Duration of this database query in seconds. */
  duration: Scalars["Float"]
  /** The raw SQL of this query, without params. */
  rawSql: Scalars["String"]
  /** JSON encoded database query parameters. */
  params: Scalars["String"]
  /** Start time of this database query. */
  startTime: Scalars["Float"]
  /** Stop time of this database query. */
  stopTime: Scalars["Float"]
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars["Boolean"]
  /** Whether this database query was a SELECT. */
  isSelect: Scalars["Boolean"]
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars["String"]>
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars["String"]>
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars["String"]>
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars["String"]>
}

export type BookPassage = {
  __typename?: "BookPassage"
  text?: Maybe<Scalars["String"]>
  author?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  startIdx?: Maybe<Scalars["Int"]>
}

export type PoemType = {
  __typename?: "PoemType"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  passage: Scalars["String"]
  book: BookType
  author?: Maybe<UserType>
  colorRange: Scalars["Int"]
  backgroundId: Scalars["Int"]
  textChunks?: Maybe<Array<Maybe<TextChunkType>>>
}

export type BookType = {
  __typename?: "BookType"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  author: Scalars["String"]
  title: Scalars["String"]
  text: Scalars["String"]
}

export type UserType = {
  __typename?: "UserType"
  id: Scalars["ID"]
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]
  email: Scalars["String"]
  dateJoined: Scalars["DateTime"]
  poems: Array<PoemType>
  poemsWrittenCount?: Maybe<Scalars["Int"]>
}

export type TextChunkType = {
  __typename?: "TextChunkType"
  text?: Maybe<Scalars["String"]>
  isSelected?: Maybe<Scalars["Boolean"]>
}

export type PomePaginationType = {
  __typename?: "PomePaginationType"
  totalCount?: Maybe<Scalars["Int"]>
  edges?: Maybe<Array<Maybe<PoemType>>>
}

export type Mutation = {
  __typename?: "Mutation"
  createPoem?: Maybe<CreatePoemMutation>
  updatePoem?: Maybe<UpdatePoemMutation>
  deletePoem?: Maybe<DeletePoemMutation>
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>
  verifyToken?: Maybe<Verify>
  refreshToken?: Maybe<Refresh>
  createUser?: Maybe<CreateUserMutation>
}

export type MutationCreatePoemArgs = {
  bookId?: Maybe<Scalars["ID"]>
  startIdx?: Maybe<Scalars["Int"]>
  textChunks?: Maybe<Array<Maybe<InputTextChunkType>>>
}

export type MutationUpdatePoemArgs = {
  backgroundId?: Maybe<Scalars["Int"]>
  colorRange?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["ID"]>
  textChunks?: Maybe<Array<Maybe<InputTextChunkType>>>
}

export type MutationDeletePoemArgs = {
  id?: Maybe<Scalars["ID"]>
}

export type MutationTokenAuthArgs = {
  username: Scalars["String"]
  password: Scalars["String"]
}

export type MutationVerifyTokenArgs = {
  token?: Maybe<Scalars["String"]>
}

export type MutationRefreshTokenArgs = {
  token?: Maybe<Scalars["String"]>
}

export type MutationCreateUserArgs = {
  password?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type CreatePoemMutation = {
  __typename?: "CreatePoemMutation"
  poem?: Maybe<PoemType>
}

export type InputTextChunkType = {
  text?: Maybe<Scalars["String"]>
  isSelected?: Maybe<Scalars["Boolean"]>
}

export type UpdatePoemMutation = {
  __typename?: "UpdatePoemMutation"
  poem?: Maybe<PoemType>
}

export type DeletePoemMutation = {
  __typename?: "DeletePoemMutation"
  id?: Maybe<Scalars["String"]>
}

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken"
  payload: Scalars["GenericScalar"]
  refreshExpiresIn: Scalars["Int"]
  token: Scalars["String"]
}

export type Verify = {
  __typename?: "Verify"
  payload: Scalars["GenericScalar"]
}

export type Refresh = {
  __typename?: "Refresh"
  payload: Scalars["GenericScalar"]
  refreshExpiresIn: Scalars["Int"]
  token: Scalars["String"]
}

export type CreateUserMutation = {
  __typename?: "CreateUserMutation"
  user?: Maybe<UserType>
}
