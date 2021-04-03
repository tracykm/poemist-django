import IndexView from "src/components/manyPoemViews/IndexView"
import { getPoems } from "src/queries/poems"

export default function HomeView() {
  return (
    <div className="index-view">
      <h5>Browse through all the communities poems!</h5>
      <IndexView {...{ query: getPoems, variables: { limit: 10 } }} />
    </div>
  )
}
