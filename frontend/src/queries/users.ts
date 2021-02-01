import gql from "graphql-tag"

export const getCurrentUser = gql`
  query getCurrentUser {
    current {
      id
      username
    }
  }
`

export const getUser = gql`
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

export const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`
