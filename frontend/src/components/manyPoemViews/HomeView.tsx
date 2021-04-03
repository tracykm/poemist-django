import IndexView from "src/components/manyPoemViews/IndexView"
import { getPoems } from "src/queries/poems"
import { useQuery } from "urql"
import Loader from "../universal/Loader"

export default function HomeView() {
  const [{ data }, reexecuteQuery] = useQuery({
    query: getPoems,
    variables: { limit: 10 },
  })
  if (!data) {
    return <Loader />
  }

  return (
    <div className="index-view">
      <h5>Browse through all the communities poems!</h5>
      <IndexView {...{ poems: data.poemPages, reexecuteQuery }} />
    </div>
  )
}
