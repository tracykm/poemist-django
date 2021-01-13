import { gql } from "@apollo/client";

const getBook = gql`
  query GetBook {
    poems {
      id
      author {
        email
      }
    }
  }
`;

export default getBook;
