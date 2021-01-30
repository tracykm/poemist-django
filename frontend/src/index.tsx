import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { HashRouter as Router } from "react-router-dom"

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client"
import produce from "immer"

const DEV_API = "http://localhost:8000/graphql"
const STAGING_API = "https://calm-lowlands-48993.herokuapp.com/graphql"

const client = new ApolloClient({
  uri: STAGING_API,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          poemPages: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = { edges: [] }, incoming) {
              debugger
              if (incoming.type === "DELETE") {
                const newEdges = produce(existing.edges, (draft: any[]) => {
                  var idx = draft.findIndex((d) => d.id === incoming.payload.id)
                  draft.splice(idx, 1)
                })
                debugger
                return newEdges
              }
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              }
            },
          },
        },
      },
    },
  }),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
