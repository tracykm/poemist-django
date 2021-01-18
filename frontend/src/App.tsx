import React from "react"
import { useGetBookQuery } from "./queries/autogenerate/hooks"
import { Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import CloseUpPoemView from "./components/poem/CloseUpPoemView"

function App() {
  const { data } = useGetBookQuery()
  return (
    <div className="App">
      <Header />
      <Switch>
        {/* <Route path="/" exact component={HomeView} />
      <Route path="/about" component={About} />
      <Route path="/edit/stylize/:id" component={StyleView} />
      <Route path="/new/stylize" component={StyleView} />
      <Route path="/new/write" component={WriteView} />
      <Route path="/edit/write/:id" component={WriteView} /> */}
        <Route path="/poem/:id" component={CloseUpPoemView} />
        {/* <Route path="/user/:id" component={ProfileView} /> */}
      </Switch>
    </div>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

export default App
