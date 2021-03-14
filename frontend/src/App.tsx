import { Switch, Route } from "react-router-dom"
import CloseUpPoemView from "./components/poem/CloseUpPoemView"
import HomeView from "./components/manyPoemViews/HomeView"
import ProfileView from "./components/manyPoemViews/ProfileView"
import AppWrapper from "./components/fullApp/AppWrapper"
import About from "./components/fullApp/About"
import StyleView from "./components/selectable/StyleView"
import WriteView from "./components/selectable/WriteView"

function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/about" component={About} />
        <Route path="/edit/stylize/:id" component={StyleView} />
        <Route path="/new/write" component={WriteView} />
        <Route path="/edit/write/:id" component={WriteView} />
        <Route path="/poem/:id" component={CloseUpPoemView} />
        <Route path="/user/:id" component={ProfileView} />
      </Switch>
    </AppWrapper>
  )
}

export default App
