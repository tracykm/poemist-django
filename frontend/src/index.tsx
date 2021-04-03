import { StrictMode } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { HashRouter as Router } from "react-router-dom"

import { createClient, Provider } from "urql"
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ApolloProvider } from "@apollo/client"

import { ErrorBoundary } from "./components/universal/ErrorBoundary"

import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

const DEV_API = "http://localhost:8000/graphql"
const STAGING_API = "https://calm-lowlands-48993.herokuapp.com/graphql"

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? DEV_API : STAGING_API,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
})

const client = createClient({
  url: process.env.NODE_ENV === "development" ? DEV_API : STAGING_API,
  fetchOptions: () => {
    const token = localStorage.getItem("token")
    return {
      headers: { Authorization: token ? `JWT ${token}` : "" },
    }
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
})

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider value={client}>
        <ApolloProvider client={apolloClient}>
          <Router>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </Router>
        </ApolloProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
