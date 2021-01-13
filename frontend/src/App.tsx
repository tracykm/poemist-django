import React from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_BOOK = gql`
  query Book {
    book {
      id
      title
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BOOK);
  return (
    <div className="App">
      <header className="App-header">
        <p>{data?.book?.title}</p>
      </header>
    </div>
  );
}

export default App;
