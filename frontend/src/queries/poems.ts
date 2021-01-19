import gql from "graphql-tag"

export const getSinglePoem = gql`
  query getSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      book {
        id
        title
      }
      createdAt
      updatedAt
    }
    current {
      id
    }
  }
`

export const getPoems = gql`
  query getPoems {
    poems {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      book {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`

export const getPoemsByAuthor = gql`
  query getPoemsByAuthor($authorId: ID) {
    poems(authorId: $authorId) {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      book {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`

export const createPoem = gql`
  mutation createPoem($textChunks: [InputTextChunkType]!, $bookId: ID!) {
    createPoem(textChunks: $textChunks, bookId: $bookId) {
      poem {
        id
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
        id
      }
    }
  }
`
