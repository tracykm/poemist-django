import gql from "graphql-tag"

const PoemDetails = gql`
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

export const getSinglePoem = gql`
  query getSinglePoem($id: ID!) {
    poem(id: $id) {
      ...PoemDetails
    }
    current {
      id
    }
  }
`

export const getPoems = gql`
  query getPoems($offset: Int, $limit: Int) {
    poemPages(offset: $offset, limit: $limit) {
      edges {
        ...PoemDetails
      }
    }
  }
`

export const getPoemsByAuthor = gql`
  query getPoemsByAuthor($authorId: ID, $offset: Int, $limit: Int) {
    poemPages(authorId: $authorId, offset: $offset, limit: $limit) {
      edges {
        ...PoemDetails
      }
    }
  }
`

export const createPoem = gql`
  mutation createPoem($textChunks: [InputTextChunkType]!, $bookId: ID!) {
    createPoem(textChunks: $textChunks, bookId: $bookId) {
      poem {
        ...PoemDetails
      }
    }
  }
`

export const updatePoem = gql`
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
`

export const deletePoem = gql`
  mutation deletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
    }
  }
`
