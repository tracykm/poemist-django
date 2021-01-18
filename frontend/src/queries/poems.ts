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
      createdAt
      updatedAt
    }
  }
`
