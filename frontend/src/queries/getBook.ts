import { gql } from "@apollo/client";

const getBook = gql`
  query GetBook {
    poems {
      id
      createdAt
      colorRange
      backgroundId
      textChunks {
        text
        isSelected
      }
      author {
        id
        email
      }
    }
  }
`;

export default getBook;
