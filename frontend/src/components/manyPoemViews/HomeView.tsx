import React, { useEffect } from "react"
import IndexView from "src/components/manyPoemViews/IndexView"
import { useGetPoemsQuery } from "src/queries/autogenerate/hooks"
import Loader from "../universal/Loader"

export default function HomeView() {
  const { data, fetchMore } = useGetPoemsQuery({ variables: { limit: 10 } })
  if (!data) {
    return <Loader />
  }

  return (
    <div className="index-view">
      <h5>Browse through all the communities poems!</h5>
      <IndexView {...{ poems: data.poemPages, fetchMore }} />
    </div>
  )
}
