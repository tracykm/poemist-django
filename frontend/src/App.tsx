import React from "react";
import "./App.css";
import { useGetBookQuery } from "./queries/autogenerate/hooks";

function App() {
  const { data } = useGetBookQuery();
  return (
    <div className="App">
      <header className="App-header">
        <p>{data?.poems?.[1].author.id}</p>
      </header>
    </div>
  );
}

export default App;
