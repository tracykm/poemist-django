import gql from "graphql-tag"

export const getRandomBook = gql`
  query getRandomBook {
    randomBook {
      id
      title
      text
      startIdx
    }
  }
`
