import React from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import getBook from "./queries/getBook";
import { GetBook } from "./queries/types/GetBook";

function App() {
  const { data } = useQuery<GetBook>(getBook);
  return (
    <div className="App">
      <header className="App-header">
        <p>{data?.poems?.[1].author.email}</p>
      </header>
    </div>
  );
}

export default App;
